---
description: 可以打开或关闭的双态按钮。

links:
  - label: Form
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/toggle
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdToggleOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add toggle
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string
      - string[]
    description: 当前选中项
  - name: type
    type:
      - single
      - multiple
    default: multiple
    description: 类型
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
    default: sm
    description: 圆角
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
    default: sm
    description: 大小
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts[ToggleGroupItem]
interface ToggleGroupItem {
  value: string
  icon?: string
  text?: string
  loading?: boolean
  class?: any
}
```

### 插槽

::slots-table
---
data:
  - name: default
    payload:
      - "item: ToggleGroupItem"
      - "active: boolean"
    description: 选项插槽
---
::
