---
description: 允许用户在选中和未选中之间切换的控件。

links:
  - label: Form
    icon: lucide:text-cursor-input
  - label: Checkbox
    icon: lucide:component
    to: https://reka-ui.com/docs/components/checkbox
    target: _blank
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/checkbox
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdCheckboxOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add checkbox
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - boolean
    description: 选中状态
  - name: indeterminate
    type:
      - boolean
    default: false
    description: 不确定状态
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
  - name: variant
    type:
      - normal
      - card
      - table
    default: normal
    description: 样式
  - name: align
    type:
      - start
      - center
      - end
    default: start
    description: 对齐方式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: sm
    description: 圆角
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 大小
  - name: indicator
    type:
      - start
      - end
      - none
    default: start
    description: 选中指示器位置
---
::

```ts[CheckboxGroupItem]
interface CheckboxGroupItem {
  label?: string
  description?: string
  icon?: string
  value: string
  disabled?: boolean
  loading?: boolean
  class?: any
}
```

### 插槽

::slots-table
---
data:
  - name: leading
    payload:
      - "item: CheckboxGroupItem"
    description: 前置内容
  - name: trailing
    payload:
      - "item: CheckboxGroupItem"
    description: 后置内容
  - name: label
    payload:
      - "item: CheckboxGroupItem"
    description: 标题
  - name: description
    payload:
      - "item: CheckboxGroupItem"
    description: 描述
  - name: indicator
    payload:
      - "item: CheckboxGroupItem"
    description: 指示器
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[value: string[]]'
    description: 选中状态改变事件
  - name: change
    type:
      - '[value: string[]]'
    description: 选中状态改变事件
---
::
