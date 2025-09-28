---
description: 用于指示多步骤流程进度的步骤组件。

links:
  - label: Navigation
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/stepper
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdStepperOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add stepper
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - number
    description: 当前步骤
  - name: steps
    type:
      - StepperItem[]
    description: 步骤数据
  - name: completedIcon
    type:
      - string
    default: check
    description: 已完成图标
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
  - name: orientation
    type:
      - horizontal
      - vertical
    default: horizontal
    description: 布局方向
  - name: linear
    type:
      - boolean
    default: false
    description: 是否为线性模式
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts [StepperItem]
interface StepperItem {
  value?: string | number
  icon?: string
  title?: string
  description?: string
  class?: any
  ui?: Partial<Omit<StepperStyleSlots, 'base'>>
}
```

### 插槽

::slots-table
---
data:
  - name: icon
    payload:
      - "totalSteps: number"
      - "state: 'active' | 'completed' | 'pending'"
      - "step: StepperItem"
      - "current: number"
    description: 图标插槽
  - name: title
    payload:
      - "totalSteps: number"
      - "state: 'active' | 'completed' | 'pending'"
      - "step: StepperItem"
      - "current: number"
    description: 标题插槽
  - name: description
    payload:
      - "totalSteps: number"
      - "state: 'active' | 'completed' | 'pending'"
      - "step: StepperItem"
      - "current: number"
    description: 描述插槽
---
::
