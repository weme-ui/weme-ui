---
description: 用于显示任务完成进度的指示器，通常以进度条的形式展示。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/progress
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdProgressOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add progress
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - number
    description: 进度值
  - name: label
    type:
      - string
    description: 标题
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
  - name: animate
    type:
      - none
      - swing
      - stripe
    default: none
    description: 动画
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: xl
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
  - name: label
    payload:
      - "modelValue: number"
    description: 标题
---
::

### 事件

::emits-table
---
data:
  - name: update:modelValue
    type:
      - '[value: number]'
    description: 进度值改变事件
  - name: update:max
    type:
      - '[value: number]'
    description: 最大值改变事件
---
::
