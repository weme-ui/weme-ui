---
description: 链接组件，基于 NuxtLink 封装，支持自定义样式。

links:
  - label: General
    icon: lucide:component
    to: /docs/std/components/general
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/link
    target: _blank
---

::preview
#preview
:ExamplesStdLink
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add link
```

## API

### 属性

::props-table
---
data:
  - name: text
    type:
      - string
    description: 链接文字
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 链接颜色
  - name: disabled
    type:
      - boolean
    default: false
    description: 链接禁用状态
  - name: class
    type:
      - any
    description: 自定义样式
---
::

> 关于 `NuxtLink` 的属性，请参考 [Nuxt 文档](https://nuxt.com/docs/api/components/nuxt-link){target="_blank"}

## 示例

### 颜色

::preview
#preview
:ExamplesStdLinkColors

#code
```vue inset
<UiLink color="accent">
  Text Link
</UiLink>
```
::

### 禁用

::preview
#preview
:ExamplesStdLink{ :disabled=true }

#code
```vue inset
<UiLink disabled>
  Text Link
</UiLink>
```
::
