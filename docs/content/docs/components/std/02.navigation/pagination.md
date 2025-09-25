---
description: 以分页格式显示数据并提供页面间导航。

links:
  - label: Navigation
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/pagination
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdPaginationOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add pagination
```

## API

### 属性

::props-table
---
data:
  - name: page
    type:
      - number
    default: 1
    description: 当前页码 (v-model)
  - name: total
    type:
      - number
    default: 0
    description: 总条目数
  - name: itemsPerPage
    type:
      - number
    default: 10
    description: 每页显示条目数
  - name: siblingCount
    type:
      - number
    default: 2
    description: 显示的相邻页码数
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: solid
    description: 样式
  - name: size
    type:
      - sm
      - md
      - lg
    default: md
    description: 大小
  - name: align
    type:
      - start
      - end
    default: end
    description: 对齐方式
  - name: showTotal
    type:
      - boolean
    default: false
    description: 是否显示总条目数
  - name: showEdges
    type:
      - boolean
    default: true
    description: 是否显示边缘页码
  - name: simple
    type:
      - boolean
    default: false
    description: 是否简洁显示
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
  - name: total
    payload:
      - "page: number"
      - "pageCount: number"
      - "total: number"
    description: 总条目数插槽
  - name: first
    description: 首页插槽
  - name: prev
    description: 上一页插槽
  - name: item
    payload:
      - "item: { type: 'page' | 'ellipsis', value: number }"
      - "index: number"
      - "page: number"
      - "pageCount: number"
    description: 页码插槽
  - name: ellipsis
    description: 省略号插槽
  - name: next
    description: 下一页插槽
  - name: last
    description: 末页插槽
---
::

### 事件

::emits-table
---
data:
  - name: update:page
    type:
      - '[value: number]'
    description: 页码改变事件
---
::
