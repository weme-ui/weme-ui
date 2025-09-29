---
description: 将元数据显示为键值对列表。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/data-list
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdDataListOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add data-list
```

## API

### 属性

::props-table
---
data:
  - name: items
    type:
      - DataListItem[]
    description: 数据项
  - name: orientation
    type:
      - horizontal
      - vertical
    default: horizontal
    description: 排列方向
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: sm
    description: 大小
  - name: highlight
    type:
      - boolean
    default: false
    description: 是否高亮
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts[DataListItem]
interface DataListItem {
  label: string
  value: string
  class?: any
  ui?: Partial<Pick<DataListStyleSlots, 'label' | 'value'>>
  [key: string]: any
}
```

### 插槽

::slots-table
---
data:
  - name: default
    payload:
      - "item: DataListItem"
      - "index: number"
    description: 默认插槽
  - name: label
    payload:
      - "item: DataListItem"
      - "index: number"
    description: 标签插槽
  - name: value
    payload:
      - "item: DataListItem"
      - "index: number"
    description: 值插槽
---
::
