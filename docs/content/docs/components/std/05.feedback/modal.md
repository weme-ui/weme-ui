---
description: 一个覆盖在主窗口或其他对话框窗口上的窗口，使下方的内容处于惰性状态。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/modal
    target: _blank
---

::preview
#preview
:ExamplesStdModalOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add modal
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
  - name: variant
    type:
      - normal
      - clean
    default: normal
    description: 样式
  - name: side
    type:
      - top
      - right
      - bottom
      - left
    default: center
    description: 弹出位置
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: lg
    description: 弹出圆角
  - name: triggerProps
    type:
      - DialogTriggerProps
    description: 触发器属性
  - name: portalProps
    type:
      - DialogPortalProps
    description: 弹出层属性
  - name: contentProps
    type:
      - Omit<DialogContentProps, 'asChild'>
    description: 弹出内容属性
  - name: overlayProps
    type:
      - DialogOverlayProps
    description: 背景属性
  - name: translucent
    type:
      - boolean
    default: false
    description: 弹出是否半透明
  - name: bordered
    type:
      - boolean
    default: false
    description: 弹出是否带边框
  - name: closable
    type:
      - boolean
    default: false
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
  - name: default
    description: 触发器
  - name: header
    description: 头部
  - name: icon
    description: 图标
  - name: title
    description: 标题
  - name: description
    description: 描述
  - name: close
    description: 关闭按钮
  - name: content
    description: 内容
  - name: footer
    description: 底部
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
