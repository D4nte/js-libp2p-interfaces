import { expect } from 'aegir/chai'
import sinon from 'sinon'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { mockRegistrar } from '../mocks/registrar.js'
import type { TestSetup } from '../index.js'
import type { PubSubArgs } from './index.js'
import { Components } from '@libp2p/interfaces/components'
import { start, stop } from '../index.js'
import type { PubSub } from '@libp2p/interfaces/pubsub'
import { createComponents } from './utils.js'
import { mockNetwork } from '../mocks/connection-manager.js'

const topic = 'foo'
const data = uint8ArrayFromString('bar')
const shouldNotHappen = () => expect.fail()

export default (common: TestSetup<PubSub, PubSubArgs>) => {
  describe('emit self', () => {
    describe('enabled', () => {
      let pubsub: PubSub
      let components: Components

      before(async () => {
        mockNetwork.reset()
        components = await createComponents()

        pubsub = components.setPubSub(await common.setup({
          components,
          init: {
            emitSelf: true
          }
        }))

        await start(components)
        pubsub.subscribe(topic)
      })

      after(async () => {
        sinon.restore()
        await stop(components)
        await common.teardown()
        mockNetwork.reset()
      })

      it('should emit to self on publish', async () => {
        const promise = new Promise<void>((resolve) => {
          pubsub.addEventListener('message', (evt) => {
            if (evt.detail.topic === topic) {
              resolve()
            }
          }, {
            once: true
          })
        })

        const result = await pubsub.publish(topic, data)

        await promise

        expect(result).to.have.property('recipients').with.lengthOf(1)
      })
    })

    describe('disabled', () => {
      let pubsub: PubSub
      let components: Components

      before(async () => {
        mockNetwork.reset()
        components = new Components({
          peerId: await createEd25519PeerId(),
          registrar: mockRegistrar()
        })
        pubsub = components.setPubSub(await common.setup({
          components,
          init: {
            emitSelf: false
          }
        }))

        await start(components)
        pubsub.subscribe(topic)
      })

      after(async () => {
        sinon.restore()
        await stop(components)
        await common.teardown()
        mockNetwork.reset()
      })

      it('should not emit to self on publish', async () => {
        pubsub.addEventListener('message', shouldNotHappen, {
          once: true
        })

        await pubsub.publish(topic, data)

        // Wait 1 second to guarantee that self is not noticed
        return await new Promise((resolve) => setTimeout(resolve, 1000))
      })
    })
  })
}
