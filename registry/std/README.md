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
  - [x] `app`
  - [ ] `theme` // 稍后实现
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
  - [x] `banner`
  - [x] `progress`
  - [x] `result`
  - [x] `skeleton`
  - [x] `spinner`
  - [x] `toast`
- Collections
  - [ ] `combobox`
  - [ ] `listbox`
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
  - [x] `accordion`
  - [x] `breadcrumb`
  - [x] `carousel`
  - [x] `collapsible`
  - [x] `pagination`
  - [x] `steps`
  - [x] `tabs`
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
  - [x] `input`
  - [ ] `label`
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
  - [x] `action-sheet`
  - [x] `dropdown`
  - [x] `context-menu`
  - [x] `modal`
  - [x] `pop-confirm`
  - [x] `popover`
  - [x] `toggle-tooltip`
  - [x] `tooltip`
  - [x] `overlay`
- Others
  - [ ] `floating-panel`
  - [ ] `signature`
  - [ ] `splitter`
  - [ ] `tour`
  - [ ] `watermark`
  - [x] `affix`
  - [x] `anchor` // TODO: 需要完善
  - [x] `highlight`
  - [x] `lens`
  - [x] `marquee`
  - [x] `number-ticker`
  - [x] `qr-code`
  - [x] `timer`

## 组合式 API

- [x] `defineLocale`, `useLocale`, `usePortal`
- [x] `defineShortcuts`
- [x] `useImageLoadingStatus` includes `UiImage`
- [x] `useKbd` includes `UiKbd`
- [x] `useHighlight` includes `UiHighlight`
- [x] `useToast` includes `UiToast`, `UiToastProvider`

---

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/weme-ui
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui/
