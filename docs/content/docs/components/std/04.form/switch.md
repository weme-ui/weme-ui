---
description: 允许用户在选中和未选中之间切换的控件。

links:
  - label: Form
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/switch
    target: _blank
---

::preview
#preview
:ExamplesStdSwitchOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add switch
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - boolean
    description: 开关状态
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
      - full
    default: full
    description: 圆角
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
    default: md
    description: 大小
  - name: loading
    type:
      - boolean
    default: false
    description: 加载状态
  - name: checkedIcon
    type:
      - string
    description: 选中图标
  - name: uncheckedIcon
    type:
      - string
    description: 未选中图标
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
    payload:
      - "checked: boolean"
    description: 图标
---
::
