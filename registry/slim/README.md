<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" alt="Weme UI" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">Slim</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![code style][code-style-src]][code-style-href]

<p align="center">
  Re-usable UI components with Reka UI and UnoCSS.
</p>

<p align="center">
  ⚠️ Do not use in production. This project is still in early development.
</p>

## 如何开始

### 初始化

```bash
pnpm dlx @weme-ui/weme-ui init
```

### 添加组件

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/button
```

## 组件列表

- **General**
  - [ ] `kbd`
  - [x] `animated-select-icon`
  - [x] `button-group`
  - [x] `button`
  - [x] `config-provider`
  - [x] `icon-stack`
  - [x] `icon-tile`
  - [x] `icon`
  - [x] `link-overlay`
  - [x] `link`
  - [x] `separator`

- **Navigation**
  - [ ] `activity-bar`
  - [ ] `breadcrumb`
  - [ ] `command-palette`
  - [ ] `pagination`
  - [ ] `steps`
  - [ ] `tabs`

- **Data Display**
  - [ ] `avatar`
  - [ ] `avatar-group`
  - [ ] `badge`
  - [ ] `calendar`
  - [ ] `card`
  - [ ] `chip`
  - [ ] `image`
  - [ ] `image-viewer`
  - [ ] `table`
  - [ ] `timeline`
  - [ ] `tree`

- **Feedback**
  - [ ] `alert`
  - [ ] `banner`
  - [ ] `progress`
  - [ ] `skeleton`
  - [ ] `toast`
  - [x] `empty`

- **Layout**
  - [ ] `marquee`
  - [ ] `scroll-area`

- **Agents**
  - [ ] `agent-activity`
  - [ ] `agent-loading-state`
  - [ ] `approval-card`
  - [ ] `citations`
  - [ ] `message-scroller`
  - [ ] `message`
  - [ ] `prompt-input`
  - [ ] `todo-list`
  - [ ] `tool-approval`
  - [ ] `tool-result`

- **Overlay**
  - [ ] `action-sheet`
  - [ ] `context-menu`
  - [ ] `drawer`
  - [ ] `dropdown`
  - [ ] `modal`
  - [ ] `pop-confirm`
  - [ ] `popover`
  - [ ] `tooltip`

- **Form**
  - [ ] `cascader`
  - [ ] `checkbox-group`
  - [ ] `checkbox`
  - [ ] `color-picker`
  - [ ] `color-swatch-picker`
  - [ ] `date-picker`
  - [ ] `file-upload`
  - [ ] `filters`
  - [ ] `radio-group`
  - [ ] `rich-text`
  - [ ] `slider`
  - [x] `autocomplete`
  - [x] `combobox`
  - [x] `form-field`
  - [x] `form`
  - [x] `input`
  - [x] `listbox`
  - [x] `number-input`
  - [x] `password-input`
  - [x] `password-strength`
  - [x] `pin-input`
  - [x] `range-input`
  - [x] `select`
  - [x] `switch`
  - [x] `tag-group`
  - [x] `tags-input`
  - [x] `textarea`

## 组合式函数

- [ ] `useToast()`
- [x] `useGroupItems()`
- [x] `useFormContext()`
- [x] `useFormFieldContext()`
- [x] `usePasswordStrength()`
- [x] `usePopoverContent()`

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/weme-ui
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui
[code-style-src]: https://antfu.me/badge-code-style.svg
[code-style-href]: https://github.com/antfu/eslint-config
