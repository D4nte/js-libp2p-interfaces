// @ts-nocheck interface tests
/* eslint-env mocha */
/* eslint max-nested-callbacks: ["error", 8] */
'use strict'

const { expect } = require('aegir/utils/chai')
const pair = require('it-pair/duplex')
const { pipe } = require('it-pipe')
const pDefer = require('p-defer')
const { consume } = require('streaming-iterables')
const { source: abortable } = require('abortable-iterator')
const AbortController = require('abort-controller').default
const uint8arrayFromString = require('uint8arrays/from-string')

function pause (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomBuffer () {
  return uint8arrayFromString(Math.random().toString())
}

const infiniteRandom = {
  [Symbol.asyncIterator]: async function * () {
    while (true) {
      yield randomBuffer()
      await pause(10)
    }
  }
}

const oneBufferAndWait = {
  [Symbol.asyncIterator]: async function * () {
    yield randomBuffer()
    await new Promise(() => {})
  }
}

module.exports = (common) => {
  describe('close', () => {
    let Muxer

    beforeEach(async () => {
      Muxer = await common.setup()
    })

    it('closing underlying socket closes streams', async () => {
      const mockConn = muxer => ({
        newStream: (...args) => muxer.newStream(...args)
      })

      const mockUpgrade = maConn => {
        const muxer = new Muxer(stream => pipe(stream, stream))
        pipe(maConn, muxer, maConn)
        return mockConn(muxer)
      }

      const [local, remote] = pair()
      const controller = new AbortController()
      const abortableRemote = abortable.duplex(remote, controller.signal, {
        returnOnAbort: true
      })

      mockUpgrade(abortableRemote)
      const dialerConn = mockUpgrade(local)

      const s1 = await dialerConn.newStream()
      const s2 = await dialerConn.newStream()

      // close the remote in a bit
      setTimeout(() => controller.abort(), 50)

      const s1Result = pipe(infiniteRandom, s1, consume)
      const s2Result = pipe(infiniteRandom, s2, consume)

      // test is complete when all muxed streams have closed
      await s1Result
      await s2Result
    })

    it('closing one of the muxed streams doesn\'t close others', async () => {
      const p = pair()
      const dialer = new Muxer()

      // Listener is echo server :)
      const listener = new Muxer(stream => pipe(stream, stream))

      pipe(p[0], dialer, p[0])
      pipe(p[1], listener, p[1])

      const stream = dialer.newStream()
      const streams = Array.from(Array(5), () => dialer.newStream())
      let closed = false
      const controllers = []

      const streamResults = streams.map(async stream => {
        const controller = new AbortController()
        controllers.push(controller)

        try {
          const abortableRand = abortable(infiniteRandom, controller.signal, { abortCode: 'ERR_TEST_ABORT' })
          await pipe(abortableRand, stream, consume)
        } catch (err) {
          if (err.code !== 'ERR_TEST_ABORT') throw err
        }

        if (!closed) throw new Error('stream should not have ended yet!')
      })

      // Pause, and then send some data and close the first stream
      await pause(50)
      await pipe([randomBuffer()], stream, consume)
      closed = true

      // Abort all the other streams later
      await pause(50)
      controllers.forEach(c => c.abort())

      // These should now all resolve without error
      await Promise.all(streamResults)
    })

    it('can close a stream for writing before writing', (done) => {
      const p = pair()
      const dialer = new Muxer()
      const data = [randomBuffer(), randomBuffer()]

      const listener = new Muxer(async stream => {
        // Immediate close for write
        await stream.closeWrite()

        const results = await pipe(stream, async (source) => {
          const data = []
          for await (const chunk of source) {
            data.push(chunk.slice())
          }
          return data
        })
        expect(results).to.eql(data)

        try {
          await stream.sink([randomBuffer()])
        } catch (err) {
          expect(err).to.exist()
          return done()
        }
        expect.fail('should not support writing to closed writer')
      })

      pipe(p[0], dialer, p[0])
      pipe(p[1], listener, p[1])

      const stream = dialer.newStream()
      stream.sink(data)
    })

    it('can close a stream for writing after writing', (done) => {
      const p = pair()
      const dialer = new Muxer()
      const data = [randomBuffer(), randomBuffer()]

      const listener = new Muxer(async stream => {
        // Write some data before closing
        await stream.sink([randomBuffer()])

        // Immediate close for write
        await stream.closeWrite()

        const results = await pipe(stream, async (source) => {
          const data = []
          for await (const chunk of source) {
            data.push(chunk.slice())
          }
          return data
        })
        expect(results).to.eql(data)

        try {
          await stream.sink([randomBuffer()])
        } catch (err) {
          expect(err).to.exist()
          return done()
        }
        expect.fail('should not support writing to closed writer')
      })

      pipe(p[0], dialer, p[0])
      pipe(p[1], listener, p[1])

      const stream = dialer.newStream()
      stream.sink(data)
    })

    it('can close a stream for writing during writing', (done) => {
      const p = pair()
      const dialer = new Muxer()
      const data = [randomBuffer(), randomBuffer()]

      const listener = new Muxer(async stream => {
        // Write some data before closing
        stream.sink(oneBufferAndWait)

        // Immediate close for write
        await pause(10)
        await stream.closeWrite()

        const results = await pipe(stream, async (source) => {
          const data = []
          for await (const chunk of source) {
            data.push(chunk.slice())
          }
          return data
        })
        expect(results).to.eql(data)

        try {
          await stream.sink([randomBuffer()])
        } catch (err) {
          expect(err).to.exist()
          return done()
        }
        expect.fail('should not support writing to closed writer')
      })

      pipe(p[0], dialer, p[0])
      pipe(p[1], listener, p[1])

      const stream = dialer.newStream()
      stream.sink(data)
    })

    it('can close a stream for reading', (done) => {
      const p = pair()
      const dialer = new Muxer()
      const data = [randomBuffer(), randomBuffer()]

      const listener = new Muxer(async stream => {
        const results = await pipe(stream, async (source) => {
          const data = []
          for await (const chunk of source) {
            data.push(chunk.slice())
          }
          return data
        })
        expect(results).to.eql(data)
        done()
      })

      pipe(p[0], dialer, p[0])
      pipe(p[1], listener, p[1])

      const stream = dialer.newStream()
      stream.closeRead()

      // Source should be done
      ; (async () => {
        expect(await stream.source.next()).to.eql({ done: true })
        stream.sink(data)
      })()
    })

    it('calls onStreamEnd for closed streams not previously written', async () => {
      const deferred = pDefer()

      const onStreamEnd = () => deferred.resolve()
      const dialer = new Muxer({ onStreamEnd })

      const stream = await dialer.newStream()

      stream.close()
      await deferred.promise
    })

    it('calls onStreamEnd for read and write closed streams not previously written', async () => {
      const deferred = pDefer()

      const onStreamEnd = () => deferred.resolve()
      const dialer = new Muxer({ onStreamEnd })

      const stream = await dialer.newStream()

      stream.closeWrite()
      stream.closeRead()
      await deferred.promise
    })
  })
}
