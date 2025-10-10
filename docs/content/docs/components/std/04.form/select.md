---
description: 显示供用户选择的选项列表，支持多选、分组、图标、徽标、头像等。

links:
  - label: Form
    icon: lucide:text-cursor-input
  - label: Select
    icon: lucide:component
    to: https://reka-ui.com/docs/components/select
    target: _blank
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/select
    target: _blank
---

::preview
#preview
:ExamplesStdSelectOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add select
```

## API

### 属性

::props-table
---
data:
  - name: items
    type:
      - SelectItem[]
      - SelectItem[][]
    description: 选项列表
  - name: loading
    type:
      - boolean
    default: false
    description: 是否正在加载
  - name: loadingText
    type:
      - string
    description: 加载提示文本
  - name: emptyText
    type:
      - string
    description: 空提示文本
  - name: placeholder
    type:
      - string
    description: 占位提示文本
  - name: leadingIcon
    type:
      - string
    description: 前置图标
  - name: trailingIcon
    type:
      - string
    description: 后置图标
  - name: indicatorIcon
    type:
      - string
    description: 指示图标
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
      - outline
      - none
    default: normal
    description: 样式
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
    payload:
      - "open: boolean"
      - "value: any"
    description: 触发器
  - name: leading
    payload:
      - "open: boolean"
      - "value: any"
    description: 前置图标
  - name: trailing
    payload:
      - "open: boolean"
      - "value: any"
    description: 后置图标
  - name: item
    payload:
      - "item: SelectItem"
      - "value: any"
    description: 选项
  - name: item-leading
    payload:
      - "item: SelectItem"
      - "value: any"
    description: 选项前置内容
  - name: item-text
    payload:
      - "item: SelectItem"
      - "value: any"
    description: 选项文本
  - name: item-trailing
    payload:
      - "item: SelectItem"
      - "value: any"
    description: 选项后置内容
  - name: content-top
    description: 内容顶部
  - name: content-bottom
    description: 内容底部
  - name: empty
    description: 空状态
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[value: any]'
    description: 选项改变事件
  - name: update:open
    type:
      - '[value: boolean]'
    description: 打开关闭事件
  - name: change
    type:
      - '[value: any]'
    description: 选项改变事件
---
::
