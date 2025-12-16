<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">Std</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

<p align="center">
  Re-usable UI components with Reka UI and UnoCSS.
</p>

---

## 如何开始

### 添加组件

```bash
pnpm dlx @weme-ui/weme-ui add <name>
```

## 组件列表

- General
  - [ ] `app`
  - [ ] `theme`
  - [x] `button-group`
  - [x] `button`
  - [x] `icon-box`
  - [x] `icon-button`
  - [x] `icon`
  - [x] `kbd`
- Layout
  - [x] `aspect-ratio`
  - [x] `float`
  - [x] `group`
  - [x] `overflow`
  - [x] `scroll-area`
  - [x] `separator`
  - [x] `stack`
- Feedback
  - [x] `alert`
  - [x] `progress`
  - [x] `result`
  - [x] `skeleton`
  - [x] `spinner`
  - [ ] `toast`
- Collections
  - [ ] `combobox`
  - [ ] `listbox`
  - [ ] `picker`
  - [ ] `tree`
- Data Display
  - [x] `avatar-group`
  - [x] `avatar`
  - [x] `badge`
  - [x] `card`
  - [x] `chipboard`
  - [x] `comment`
  - [x] `data-list`
  - [x] `image-preview`
  - [x] `image`
  - [x] `item-group`
  - [x] `item`
  - [x] `stat`
  - [x] `status`
  - [x] `tag`
  - [x] `timeline`
  - [ ] `table` // 稍后实现
- Disclosure
  - [ ] `accordion`
  - [ ] `breadcrumb`
  - [ ] `carousel`
  - [ ] `collapsible`
  - [ ] `pagination`
  - [ ] `steps`
  - [ ] `tabs`
- Forms
  - [ ] `checkbox-card`
  - [ ] `checkbox`
  - [ ] `color-picker`
  - [ ] `color-swatch`
  - [ ] `date-picker`
  - [ ] `editable`
  - [ ] `field`
  - [ ] `file-upload`
  - [ ] `form`
  - [ ] `input`
  - [ ] `mention`
  - [ ] `number-input`
  - [ ] `password-input`
  - [ ] `pin-input`
  - [ ] `radio-card`
  - [ ] `radio-group`
  - [ ] `rating`
  - [ ] `segmented-control`
  - [ ] `select`
  - [ ] `slider`
  - [ ] `switch`
  - [ ] `tags-input`
  - [ ] `textarea`
  - [ ] `time-picker`
  - [ ] `toggle-group`
  - [ ] `toggle`
- Overlays
  - [ ] `action-sheet`
  - [ ] `dropdown`
  - [ ] `hover-card`
  - [ ] `modal`
  - [ ] `pop-confirm`
  - [ ] `popover`
  - [ ] `tooltip-button`
  - [ ] `tooltip`
  - [x] `overlay`
- Others
  - [ ] `affix`
  - [ ] `anchor`
  - [ ] `back-top`
  - [ ] `count-to`
  - [ ] `countdown`
  - [ ] `floating-panel`
  - [ ] `marquee`
  - [ ] `qr-code`
  - [ ] `signature`
  - [ ] `splitter`
  - [ ] `timer`
  - [ ] `tour`
  - [ ] `watermark`

## 组合式 API

- [x] `useImageLoadingStatus` includes `UiImage`
- [x] `useKbd` includes `UiKbd`

---

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/weme-ui
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui/
