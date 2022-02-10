## [@libp2p/connection-v1.1.1](https://github.com/libp2p/js-libp2p-interfaces/compare/@libp2p/connection-v1.1.0...@libp2p/connection-v1.1.1) (2022-02-10)


### Bug Fixes

* remove node event emitters ([#161](https://github.com/libp2p/js-libp2p-interfaces/issues/161)) ([221fb6a](https://github.com/libp2p/js-libp2p-interfaces/commit/221fb6a024430dc56288d73d8b8ce1aa88427701))

## [@libp2p/connection-v1.1.0](https://github.com/libp2p/js-libp2p-interfaces/compare/@libp2p/connection-v1.0.4...@libp2p/connection-v1.1.0) (2022-02-09)


### Features

* add peer store/records, and streams are just streams ([#160](https://github.com/libp2p/js-libp2p-interfaces/issues/160)) ([8860a0c](https://github.com/libp2p/js-libp2p-interfaces/commit/8860a0cd46b359a5648402d83870f7ff957222fe))

## [@libp2p/connection-v1.0.4](https://github.com/libp2p/js-libp2p-interfaces/compare/@libp2p/connection-v1.0.3...@libp2p/connection-v1.0.4) (2022-01-15)


### Trivial Changes

* update project config ([#149](https://github.com/libp2p/js-libp2p-interfaces/issues/149)) ([6eb8556](https://github.com/libp2p/js-libp2p-interfaces/commit/6eb85562c0da167d222808da10a7914daf12970b))

## [@libp2p/connection-v1.0.3](https://github.com/libp2p/js-libp2p-interfaces/compare/@libp2p/connection-v1.0.2...@libp2p/connection-v1.0.3) (2022-01-14)


### Bug Fixes

* update it-* deps to ts versions ([#148](https://github.com/libp2p/js-libp2p-interfaces/issues/148)) ([7a6fdd7](https://github.com/libp2p/js-libp2p-interfaces/commit/7a6fdd7622ce2870b89dbb849ab421d0dd714b43))

## [@libp2p/connection-v1.0.2](https://github.com/libp2p/js-libp2p-interfaces/compare/@libp2p/connection-v1.0.1...@libp2p/connection-v1.0.2) (2022-01-08)


### Trivial Changes

* add semantic release config ([#141](https://github.com/libp2p/js-libp2p-interfaces/issues/141)) ([5f0de59](https://github.com/libp2p/js-libp2p-interfaces/commit/5f0de59136b6343d2411abb2d6a4dd2cd0b7efe4))
* update package versions ([#140](https://github.com/libp2p/js-libp2p-interfaces/issues/140)) ([cd844f6](https://github.com/libp2p/js-libp2p-interfaces/commit/cd844f6e39f4ee50d006e86eac8dadf696900eb5))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.2.0 (2022-01-04)


### Bug Fixes

* update dialer tests ([#116](https://github.com/libp2p/js-libp2p-interfaces/issues/116)) ([c679729](https://github.com/libp2p/js-libp2p-interfaces/commit/c679729113feb963ff27815fcafd7af51f722df7))


### chore

* update libp2p-crypto and peer-id ([c711e8b](https://github.com/libp2p/js-libp2p-interfaces/commit/c711e8bd4d606f6974b13fad2eeb723f93cebb87))


### Features

* add auto-publish ([7aede5d](https://github.com/libp2p/js-libp2p-interfaces/commit/7aede5df39ea6b5f243348ec9a212b3e33c16a81))
* simpler peer id ([#117](https://github.com/libp2p/js-libp2p-interfaces/issues/117)) ([fa2c4f5](https://github.com/libp2p/js-libp2p-interfaces/commit/fa2c4f5be74a5cfc11489771881e57b4e53bf174))
* split out code, convert to typescript ([#111](https://github.com/libp2p/js-libp2p-interfaces/issues/111)) ([e174bba](https://github.com/libp2p/js-libp2p-interfaces/commit/e174bba889388269b806643c79a6b53c8d6a0f8c)), closes [#110](https://github.com/libp2p/js-libp2p-interfaces/issues/110) [#101](https://github.com/libp2p/js-libp2p-interfaces/issues/101)
* update package names ([#133](https://github.com/libp2p/js-libp2p-interfaces/issues/133)) ([337adc9](https://github.com/libp2p/js-libp2p-interfaces/commit/337adc9a9bc0278bdae8cbce9c57d07a83c8b5c2))


### BREAKING CHANGES

* requires node 15+
* not all fields from concrete classes have been added to the interfaces, some adjustment may be necessary as this gets rolled out





## [0.3.1](https://github.com/libp2p/js-libp2p-interfaces/compare/libp2p-connection@0.3.0...libp2p-connection@0.3.1) (2022-01-02)

**Note:** Version bump only for package libp2p-connection





# [0.3.0](https://github.com/libp2p/js-libp2p-interfaces/compare/libp2p-connection@0.2.0...libp2p-connection@0.3.0) (2022-01-02)


### Bug Fixes

* update dialer tests ([#116](https://github.com/libp2p/js-libp2p-interfaces/issues/116)) ([c679729](https://github.com/libp2p/js-libp2p-interfaces/commit/c679729113feb963ff27815fcafd7af51f722df7))


### Features

* simpler peer id ([#117](https://github.com/libp2p/js-libp2p-interfaces/issues/117)) ([fa2c4f5](https://github.com/libp2p/js-libp2p-interfaces/commit/fa2c4f5be74a5cfc11489771881e57b4e53bf174))





# [0.2.0](https://github.com/libp2p/js-libp2p-interfaces/compare/libp2p-connection@0.1.0...libp2p-connection@0.2.0) (2021-12-02)


### chore

* update libp2p-crypto and peer-id ([c711e8b](https://github.com/libp2p/js-libp2p-interfaces/commit/c711e8bd4d606f6974b13fad2eeb723f93cebb87))


### BREAKING CHANGES

* requires node 15+





# 0.1.0 (2021-11-22)


### Features

* split out code, convert to typescript ([#111](https://github.com/libp2p/js-libp2p-interfaces/issues/111)) ([e174bba](https://github.com/libp2p/js-libp2p-interfaces/commit/e174bba889388269b806643c79a6b53c8d6a0f8c)), closes [#110](https://github.com/libp2p/js-libp2p-interfaces/issues/110) [#101](https://github.com/libp2p/js-libp2p-interfaces/issues/101)


### BREAKING CHANGES

* not all fields from concrete classes have been added to the interfaces, some adjustment may be necessary as this gets rolled out
