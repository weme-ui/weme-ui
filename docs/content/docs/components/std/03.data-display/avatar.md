---
description: 用于展示用户头像的图片组件，支持加载失败时的备选显示。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/avatar
    target: _blank
---

::preview
#preview
:ExamplesStdAvatarOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add avatar
```

## Avatar

### 属性

::props-table
---
data:
  - name: src
    type:
      - string
    description: 头像图片地址
    required: true
  - name: alt
    type:
      - string
    description: 头像图片描述
  - name: fallback
    type:
      - string
    description: 头像图片加载失败时显示的文字
  - name: icon
    type:
      - string
    default: user
    description: 头像图片加载失败时显示的图标
  - name: delayMs
    type:
      - number
    default: 200
    description: 头像图片加载失败时显示的图标延迟时间
  - name: crossOrigin
    type:
      - string
    description: 头像图片跨域策略
  - name: referrerPolicy
    type:
      - string
    description: 头像图片引用策略
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 头像颜色
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: soft
    description: 头像样式
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 头像大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: full
    description: 头像圆角
  - name: class
    type:
      - any
    description: 自定义样式
---
::

### 插槽

::slots-table
---
data:
  - name: default
    description: 头像图片加载失败时显示的内容
  - name: icon
    description: 头像图片加载失败时显示的图标
---
::

### 事件

::emits-table
---
data:
  - name: loadingStatusChange
    type:
      - "[value: ImageLoadingStatus]"
    description: 头像图片加载事件
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'relative flex-(~ center) shrink-0 overflow-hidden select-none transition'
  - slot: image
    defaults: 'size-full object-cover rounded-inherit'
  - slot: fallback
    defaults: 'flex-(~ center) text-5'
---
::

### 示例

::preview
#preview
:ExamplesStdAvatarBasic

#code
```vue inset
<UiAvatar src="https://www.shadcn-vue.com/avatars/01.png" />
```
::

------

## AvatarGroup

### 属性

::props-table
---
data:
  - name: max
    type:
      - number
    description: 最大显示数量
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 头像大小
  - name: delayMs
    type:
      - number
    default: 200
    description: 头像图片加载失败时显示的图标延迟时间
  - name: crossOrigin
    type:
      - string
    description: 头像图片跨域策略
  - name: referrerPolicy
    type:
      - string
    description: 头像图片引用策略
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 头像颜色
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: soft
    description: 头像样式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: full
    description: 头像圆角
  - name: class
    type:
      - any
    description: 自定义样式
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex-(~ row-reverse) justify-end'
  - slot: items
    defaults: 'relative ring-(1 white) first:me-0'
---
::
