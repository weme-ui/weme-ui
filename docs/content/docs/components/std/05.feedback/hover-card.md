---
description: 用于让用户预览链接背后的内容。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/hover-card
    target: _blank
---

::preview
#preview
:ExamplesStdHoverCardOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add hover-card
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
  - name: showArrow
    type:
      - boolean
    default: false
    description: 是否显示箭头
  - name: asChild
    type:
      - boolean
    default: false
    description: 触发器是否为子元素
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
