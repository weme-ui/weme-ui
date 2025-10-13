---
description: 允许用户在给定范围内选择值的输入控件。

links:
  - label: Form
    icon: lucide:text-cursor-input
  - label: Slider
    icon: lucide:component
    to: https://reka-ui.com/docs/components/slider
    target: _blank
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/slider
    target: _blank
---

::preview
#preview
:ExamplesStdSliderOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add slider
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - number[]
    description: 值
  - name: defaultValue
    type:
      - number[]
    description: 默认值
  - name: min
    type:
      - number
    default: 0
    description: 最小值
  - name: max
    type:
      - number
    default: 100
    description: 最大值
  - name: step
    type:
      - number
    default: 1
    description: 步长
  - name: orientation
    type:
      - horizontal
      - vertical
    default: horizontal
    description: 方向
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 大小
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
  - name: tooltip
    type:
      - boolean
    default: false
    description: 是否显示工具提示
  - name: util
    type:
      - string
    description: 工具提示单位
  - name: class
    type:
      - any
    description: 自定义样式
---
::
