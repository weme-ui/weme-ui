---
description: Weme UI std component Popover

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/popover
    target: _blank
---

::preview
#preview
:ExamplesStdPopoverOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add popover
```

## API

### 属性

::props-table
---
data:
  - name: side
    type:
      - top
      - right
      - bottom
      - left
    default: bottom
    description: 弹出位置
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: md
    description: 弹出圆角
  - name: portal
    type:
      - PopoverPortalProps
    description: 弹出层属性
  - name: content
    type:
      - Omit<PopoverContentProps, 'side' | 'asChild'>
    description: 弹出内容属性
  - name: translucent
    type:
      - boolean
    default: false
    description: 弹出是否半透明
  - name: asChild
    type:
      - boolean
    default: false
    description: 触发器是否为子元素
  - name: closable
    type:
      - boolean
    default: false
    description: 是否显示关闭按钮
  - name: showArrow
    type:
      - boolean
    default: false
    description: 是否显示箭头
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
  - name: trigger
    description: 触发器
  - name: default
    description: 弹出内容
---
::

### 事件

::emits-table
---
data:
  - name: update:open
    type:
      - '[value: boolean]'
    description: 打开关闭事件
---
::
