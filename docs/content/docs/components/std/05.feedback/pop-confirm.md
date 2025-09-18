---
description: 点击按钮元素弹出气泡式确认框。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/pop-confirm
    target: _blank
---

::preview
#preview
:ExamplesStdPopConfirmOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add pop-confirm
```

## API

### 属性

::props-table
---
data:
  - name: content
    type:
      - string
    description: 确认框内容
  - name: icon
    type:
      - string
    description: 确认框图标
  - name: type
    type:
      - info
      - success
      - warning
      - error
    default: info
    description: 确认框类型
  - name: okButtonText
    type:
      - string
    default: 确定
    description: 确认按钮文字
  - name: cancelButtonText
    type:
      - string
    default: 取消
    description: 取消按钮文字
  - name: loading
    type:
      - boolean
    default: false
    description: 确认按钮加载状态
  - name: disabled
    type:
      - boolean
    default: false
    description: 确认按钮禁用状态
  - name: inverse
    type:
      - boolean
    default: false
    description: 是否反转颜色
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
  - name: icon
    description: 图标
---
::

### 事件

::emits-table
---

---
::
