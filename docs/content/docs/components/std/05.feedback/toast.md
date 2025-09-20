---
description: 用于临时显示简洁的消息提示。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/toast
    target: _blank
---

::preview
#preview
:ExamplesStdToastOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add toast
```

## API

### 属性

::props-table
---
data:
  - name: icon
    type:
      - string
    description: 图标
  - name: title
    type:
      - string
    description: 标题
  - name: description
    type:
      - string
    description: 描述
  - name: actions
    type:
      - ButtonProps[]
    description: 操作按钮
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 颜色
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: lg
    description: 圆角
  - name: orientation
    type:
      - horizontal
      - vertical
    default: vertical
    description: 布局方向
  - name: inverse
    type:
      - boolean
    default: false
    description: 是否反转颜色
  - name: closable
    type:
      - boolean
    default: true
    description: 是否显示关闭按钮
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
  - name: icon
    description: 图标
  - name: title
    description: 标题
  - name: description
    description: 描述
  - name: actions
    description: 操作按钮
  - name: close
    description: 关闭按钮
---
::

### 事件

[Reka UI / Toast Root](https://reka-ui.com/docs/components/toast#root)
