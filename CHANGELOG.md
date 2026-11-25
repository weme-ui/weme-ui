# Changelog

6.0.0 之前的变更仍写在各包的 CHANGELOG.md。

## v6.2.0

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.8...v6.2.0)

### 🚀 Enhancements

- **unocss-preset:** Add functions to load custom theme colors and integrate into safelist ([ea139295](https://github.com/weme-ui/weme-ui/commit/ea139295))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.8

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.7...v6.1.8)

### 🚀 Enhancements

- **schema:** Add theme configuration schema with accent colors, neutral colors, and color palettes ([88506c8b](https://github.com/weme-ui/weme-ui/commit/88506c8b))

### 💅 Refactors

- **docs:** Update docs ([8ee847c4](https://github.com/weme-ui/weme-ui/commit/8ee847c4))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.7

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.6...v6.1.7)

### 🩹 Fixes

- **cli:** Remove unused configuration file reference from project utility ([b07e0d89](https://github.com/weme-ui/weme-ui/commit/b07e0d89))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.6

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.5...v6.1.6)

### 🩹 Fixes

- **utilities:** Update color functions to handle color values with opacity support ([77865972](https://github.com/weme-ui/weme-ui/commit/77865972))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.5

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.4...v6.1.5)

### 🩹 Fixes

- **unocss-preset:** Improve merging logic for user-defined shortcuts ([da20a51f](https://github.com/weme-ui/weme-ui/commit/da20a51f))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.4

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.3...v6.1.4)

### 🩹 Fixes

- **unocss-preset:** Ensure proper merging of user-defined shortcuts and animations ([e02a0ddc](https://github.com/weme-ui/weme-ui/commit/e02a0ddc))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.3

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.2...v6.1.3)

### 🩹 Fixes

- **utilities:** Allow 'neutral' as a valid theme neutral color ([1d5d751d](https://github.com/weme-ui/weme-ui/commit/1d5d751d))
- **unocss-preset:** Ensure animation property defaults to an empty object when not provided ([c99e9e8c](https://github.com/weme-ui/weme-ui/commit/c99e9e8c))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.2

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.1...v6.1.2)

### 🩹 Fixes

- **unocss-preset:** Remove unnecessary check for unocss in Weme UI configuration loading ([13625fc3](https://github.com/weme-ui/weme-ui/commit/13625fc3))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.1

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.0...v6.1.1)

### 🚀 Enhancements

- **utilities:** Add color parsing functions for theme and neutral colors ([4f9673fb](https://github.com/weme-ui/weme-ui/commit/4f9673fb))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.0

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.0.1...v6.1.0)

### 🚀 Enhancements

- **unocss-preset:** Update UnoCSS configuration to include content pipeline ([18bd46e9](https://github.com/weme-ui/weme-ui/commit/18bd46e9))
- **unocss:** Add UnoCSS core dependency and extend configuration types ([6df33305](https://github.com/weme-ui/weme-ui/commit/6df33305))
- **unocss-preset:** Enhance theme and configuration loading with user-defined extensions ([71a94696](https://github.com/weme-ui/weme-ui/commit/71a94696))

### 🩹 Fixes

- **cli:** Update cache path to include 'cache' directory ([e360adaf](https://github.com/weme-ui/weme-ui/commit/e360adaf))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.0.1

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.0.0...v6.0.1)

### 🚀 Enhancements

- **unocss-preset:** Integrate Weme UI configuration loading for weme.config.json ([0c6d30a3](https://github.com/weme-ui/weme-ui/commit/0c6d30a3))

### 🩹 Fixes

- **unocss-preset:** Enhance Weme UI configuration loading with defu for merging options ([8d4f3e16](https://github.com/weme-ui/weme-ui/commit/8d4f3e16))
- **unocss-preset:** Ensure themes are properly defined when loading Weme UI configuration ([298c880d](https://github.com/weme-ui/weme-ui/commit/298c880d))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.0.0

[compare changes](https://github.com/weme-ui/weme-ui/compare/@weme-ui/unocss-preset@0.8.2...v6.0.0)

### 🩹 Fixes

- **cli:** Trim whitespace in writtenContent function ([1fe62b53](https://github.com/weme-ui/weme-ui/commit/1fe62b53))
- **unocss-preset:** Handle undefined cssVars in size rule parsing ([9565e4a8](https://github.com/weme-ui/weme-ui/commit/9565e4a8))
- **utilities:** Add check for empty data in isCustomCssVariable function ([ff3e6660](https://github.com/weme-ui/weme-ui/commit/ff3e6660))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

