---
description: 用于显示数值或状态的指示器。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/chip
    target: _blank
---

::preview
#preview
:ExamplesStdChipOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add chip
```

## API

### 属性

::props-table
---
data:
  - name: value
    type:
      - string
      - number
    description: 指示器值
  - name: maxValue
    type:
      - number
    description: 指示器最大值
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 指示器颜色
  - name: variant
    type:
      - normal
      - icon
      - dotted
    default: normal
    description: 指示器样式
  - name: position
    type:
      - tr
      - tl
      - br
      - bl
    default: tr
    description: 指示器位置
  - name: standalone
    type:
      - boolean
    default: false
    description: 指示器是否独立存在
  - name: inset
    type:
      - boolean
    default: false
    description: 指示器是否内嵌
  - name: visible
    type:
      - boolean
    default: true
    description: 指示器是否可见
  - name: hideZero
    type:
      - boolean
    default: false
    description: 指示器值为 0 时是否隐藏
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
    description: 指示器内容, 如：按钮、头像等。
    required: true
  - name: value
    description: 指示器值
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex-(inline center) relative shrink-0'
  - slot: chip
    defaults: 'flex-(~ center) ring-(1 neutral-1) rounded-full leading-none select-none text-[11px] font-medium whitespace-nowrap z-popup'
---
::
