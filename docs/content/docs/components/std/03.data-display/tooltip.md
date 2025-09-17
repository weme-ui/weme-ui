---
description: 当元素获得键盘焦点或鼠标悬停时显示相关信息的弹出提示。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/tooltip
    target: _blank
---

::preview
#preview
:ExamplesStdTooltipOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add tooltip
```

## API

### 属性

::props-table
---
data:
  - name: content
    type:
      - string
    description: 提示内容
  - name: side
    type:
      - top
      - right
      - bottom
      - left
      - top-left
      - top-right
      - bottom-left
      - bottom-right
    default: top
    description: 提示位置
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: md
    description: 提示圆角
  - name: showArrow
    type:
      - boolean
    default: false
    description: 是否显示箭头
  - name: loading
    type:
      - boolean
    default: false
    description: 是否显示加载状态
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
    defaults: 'leading-none'
  - slot: content
    defaults: 'overflow-hidden select-none px-2 py-1 text-sm bg-tooltip text-tooltip z-tooltip'
  - slot: loading
    defaults: 'mr-1.5'
  - slot: arrow
    defaults: 'fill-tooltip'
---
::
