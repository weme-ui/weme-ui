---
description: 显示表单输入字段或看起来像输入字段的组件。

links:
  - label: Form
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/input
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdInputOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add input
```

## Input

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string
      - number
    description: 输入值
  - name: id
    type:
      - string
    description: ID
  - name: type
    type:
      - text
      - password
      - email
      - number
      - tel
      - url
    default: text
    description: 输入类型
  - name: name
    type:
      - string
    description: 输入名称
  - name: placeholder
    type:
      - string
    description: 输入提示
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 输入颜色
  - name: variant
    type:
      - normal
      - outline
      - none
    default: normal
    description: 输入样式
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 输入大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 输入圆角
  - name: leadingIcon
    type:
      - string
    description: 前置图标
  - name: trailingIcon
    type:
      - string
    description: 后置图标
  - name: prepend
    type:
      - string
    description: 前置内容
  - name: append
    type:
      - string
    description: 后置内容
  - name: maxLength
    type:
      - number
    description: 最大输入长度
  - name: showCount
    type:
      - boolean
    description: 是否显示计数器
  - name: showClear
    type:
      - boolean
    description: 是否显示清空按钮
  - name: disabled
    type:
      - boolean
    default: false
    description: 输入禁用状态
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
    description: 输入内容
  - name: leading
    description: 前置图标
  - name: trailing
    description: 后置图标
  - name: prepend
    description: 前置内容
  - name: append
    description: 后置内容
  - name: count
    description: 计数器
  - name: clear
    description: 清空按钮
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[payload: string | number]'
    description: 输入值改变事件
  - name: focus
    type:
      - '[event: FocusEvent]'
    description: 输入框聚焦事件
  - name: blur
    type:
      - '[event: FocusEvent]'
    description: 输入框失焦事件
  - name: change
    type:
      - '[event: Event]'
    description: 输入值改变事件
  - name: enter
    type:
      - '[payload: string | number]'
    description: 回车键按下事件
  - name: clear
    type:
      - '[payload: string | number]'
    description: 清空按钮点击事件
---
::

## InputPassword

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string
    description: 输入值
  - name: showInvisibleButton
    type:
      - boolean
    description: 是否显示明文按钮
  - name: class
    type:
      - any
    description: 自定义样式
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[payload: string]'
    description: 输入值改变事件
  - name: invisibleChange
    type:
      - '[payload: boolean]'
    description: 明文按钮点击事件
---
::

## InputPin

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string[]
    description: 输入值
  - name: length
    type:
      - number
    default: 4
    description: 输入长度
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 输入颜色
  - name: variant
    type:
      - normal
      - outline
    default: normal
    description: 输入样式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 输入圆角
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 输入大小
  - name: class
    type:
      - any
    description: 自定义样式
---
::

## InputNumber

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - number
    description: 输入值
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 输入颜色
  - name: variant
    type:
      - normal
      - outline
    default: normal
    description: 输入样式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 输入圆角
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 输入大小
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
  - name: decrement
    description: 减少按钮
  - name: increment
    description: 增加按钮
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[payload: number]'
    description: 输入值改变事件
---
::
