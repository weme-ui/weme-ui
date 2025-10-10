---
description: 显示表单文本域或看起来像文本域的组件。

links:
  - label: Form
    icon: lucide:text-cursor-input
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/textarea
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdTextareaOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add textarea
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string
    description: 输入值
  - name: id
    type:
      - string
    description: ID
  - name: name
    type:
      - string
    description: 输入名称
  - name: placeholder
    type:
      - string
    description: 输入提示
  - name: rows
    type:
      - number
    default: 3
    description: 输入行数
  - name: maxLength
    type:
      - number
    description: 最大输入长度
  - name: maxRows
    type:
      - number
    description: 最大行数
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
  - name: radius
    type:
      - none
      - xs
      - sm
      - md
      - lg
      - xl
    default: sm
    description: 输入圆角
  - name: autoSize
    type:
      - boolean
    default: true
    description: 是否自动调整大小
  - name: showCount
    type:
      - boolean
    description: 是否显示计数器
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
