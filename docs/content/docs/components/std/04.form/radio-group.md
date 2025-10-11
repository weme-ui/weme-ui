---
description: 一组可选择的按钮——称为单选按钮——同一时间只能选中其中一个按钮。

links:
  - label: Form
    icon: lucide:text-cursor-input
  - label: Radio Group
    icon: lucide:component
    to: https://reka-ui.com/docs/components/radio-group
    target: _blank
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/radio-group
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdRadioGroupOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add radio-group
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string
    description: 当前选中项
  - name: items
    type:
      - RadioItem[]
    description: 选项列表
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
      - capsule
      - table
    default: normal
    description: 样式
  - name: orientation
    type:
      - horizontal
      - vertical
    default: horizontal
    description: 排列方向
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
  - name: fill
    type:
      - boolean
    default: false
    description: 是否填充容器
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
  - name: leading
    payload:
      - "item: RadioItem"
      - "checked: boolean"
    description: 前置内容
  - name: trailing
    payload:
      - "item: RadioItem"
      - "checked: boolean"
    description: 后置内容
  - name: label
    payload:
      - "item: RadioItem"
      - "checked: boolean"
    description: 标题
  - name: description
    payload:
      - "item: RadioItem"
      - "checked: boolean"
    description: 描述
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[value: string]'
    description: 选项改变事件
  - name: change
    type:
      - '[value: string]'
    description: 选项改变事件
---
::
