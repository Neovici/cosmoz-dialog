## [5.0.1](https://github.com/Neovici/cosmoz-dialog/compare/v5.0.0...v5.0.1) (2026-04-24)

### Bug Fixes

* add types to [@connected](https://github.com/connected) handler parameter ([951c106](https://github.com/Neovici/cosmoz-dialog/commit/951c106f463899ba4f29617b372be3a9cde038ed))
* use DOM lookup in [@connected](https://github.com/connected) handler to avoid race condition ([9ea9eda](https://github.com/Neovici/cosmoz-dialog/commit/9ea9eda7516cef0ed7677984dccef0e9c552ff26))

## [5.0.0](https://github.com/Neovici/cosmoz-dialog/compare/v4.0.0...v5.0.0) (2026-03-21)

### ⚠ BREAKING CHANGES

* renderDialog no longer accepts styles parameter and now requires onClose callback
* This release contains breaking changes.

- backdrop attribute removed
- manualFocus prop removed
- use-focus hook removed
- Dialog rendered in shadow DOM instead of portal

### Features

* migrate to native dialog element ([a4659c5](https://github.com/Neovici/cosmoz-dialog/commit/a4659c5a48c87184f1e0a5f934ebc6b2c4119c64))
* migrate to native dialog element ([e1a80a6](https://github.com/Neovici/cosmoz-dialog/commit/e1a80a681ba1ae561bc76d464cab6dff13211820))
* move styles to styleSheets and add CSS parts ([da9882e](https://github.com/Neovici/cosmoz-dialog/commit/da9882e98710918f8109bfb061e34745003ef880))
* update renderDialog signature and clean up ([75d2548](https://github.com/Neovici/cosmoz-dialog/commit/75d2548cf25b61a7adb85e753f43e3c9e63f619e))
* update to pionjs 2.13.0 and use useRef ([6a07b8e](https://github.com/Neovici/cosmoz-dialog/commit/6a07b8eecb998ada7b1ffd6f28a73c09a6babf62))
* use connectable wrapper for dialog lifecycle ([ce1dc24](https://github.com/Neovici/cosmoz-dialog/commit/ce1dc24bef3a9403eab3437552d67b73d67e8d5d))

### Bug Fixes

* clear browser centering styles before applying drag position ([3724481](https://github.com/Neovici/cosmoz-dialog/commit/3724481d0c1173f416f76eed07aac20522773149))
* update tests for open dialog attribute ([7981bd8](https://github.com/Neovici/cosmoz-dialog/commit/7981bd8f12df100b0e28da165a205c1131a3b510))
* use createRef and useEffect for showModal ([a753743](https://github.com/Neovici/cosmoz-dialog/commit/a753743605fbab148c123570614c9db17695fe04))

## [4.0.0](https://github.com/Neovici/cosmoz-dialog/compare/v3.0.0...v4.0.0) (2026-02-23)

### ⚠ BREAKING CHANGES

- v4.0.0 supersedes the old Polymer-based @neovici/cosmoz-dialog (v3.x).
  Consumers of the old package should migrate to v4+.

Ref: NEO-1130

### Features

- finalize v4 as the canonical cosmoz-dialog release ([7be0bb9](https://github.com/Neovici/cosmoz-dialog/commit/7be0bb92914940787dbf8f9c65521e9432319724))

## [2.0.0](https://github.com/Neovici/cosmoz-dialog/compare/v1.3.0...v2.0.0) (2026-02-23)

### ⚠ BREAKING CHANGES

- Package renamed from @neovici/cosmoz-dialog-next to @neovici/cosmoz-dialog.
  This replaces the old Polymer-based cosmoz-dialog (v3.x) with the pionjs-based implementation.
  Consumers should update their imports from @neovici/cosmoz-dialog-next to @neovici/cosmoz-dialog.

Ref: NEO-1130

### Features

- rename package from @neovici/cosmoz-dialog-next to @neovici/cosmoz-dialog ([95b0414](https://github.com/Neovici/cosmoz-dialog/commit/95b0414159d9879e7bbe15c1ce999e33d3485767))

## [1.3.0](https://github.com/Neovici/cosmoz-dialog-next/compare/v1.2.0...v1.3.0) (2026-01-20)

### Features

- export correct types ([54a0e7c](https://github.com/Neovici/cosmoz-dialog-next/commit/54a0e7cddd9a792c0daa64ea6ba640635ee14286))

## [1.2.0](https://github.com/Neovici/cosmoz-dialog-next/compare/v1.1.1...v1.2.0) (2026-01-20)

### Features

- export relocate and use-close ([71f0d6b](https://github.com/Neovici/cosmoz-dialog-next/commit/71f0d6b0a23c225c083ba9bc71d8e6960ab3a9f3))

## [1.1.1](https://github.com/Neovici/cosmoz-dialog-next/compare/v1.1.0...v1.1.1) (2026-01-20)

### Bug Fixes

- correct repository URL capitalization for npm provenance validation ([9dd328a](https://github.com/Neovici/cosmoz-dialog-next/commit/9dd328a11af210b2e30f49c398aa6f91adffdcc2))

## [1.1.0](https://github.com/neovici/cosmoz-dialog-next/compare/v1.0.0...v1.1.0) (2026-01-20)

### Features

- add loading module export ([f7e3588](https://github.com/neovici/cosmoz-dialog-next/commit/f7e3588d66f1e3434ff381299625950f44eb7466))

## 1.0.0 (2026-01-19)

### Features

- add story ([0940427](https://github.com/neovici/cosmoz-dialog-next/commit/0940427f816ebee346044dd2d4cf28083cb6df2a))
- add tooling configuration from cosmoz-queue ([c2c8789](https://github.com/neovici/cosmoz-dialog-next/commit/c2c8789b304d019d451183e2a9a384974069a7d1))
- adjust branches in workflows ([0fb2b85](https://github.com/neovici/cosmoz-dialog-next/commit/0fb2b8503aabcbcff2323565ff46ca32e1def0d2))
- migrate dialog code ([1866975](https://github.com/neovici/cosmoz-dialog-next/commit/18669757a1d9d71a731838948d31811c678388a7))
- trigger release ([66230f8](https://github.com/neovici/cosmoz-dialog-next/commit/66230f8726bc9d5bf8e84d06206380cd0e5f116a))

### Bug Fixes

- actions permissions ([f4c67ee](https://github.com/neovici/cosmoz-dialog-next/commit/f4c67ee0b9f320c40c05b0ae2d802ab4e8240bc3))
- add missing dependencies and fix linting issues ([d66963f](https://github.com/neovici/cosmoz-dialog-next/commit/d66963f3eba1afb316b1d08060bec089c20f9878))
- make handle parameter optional in relocate function to fix build ([7670b27](https://github.com/neovici/cosmoz-dialog-next/commit/7670b272713754f166d3454c50a1a7f9afc084d2))
