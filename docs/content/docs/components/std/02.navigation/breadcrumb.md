---
description: 使用链接层次结构显示当前资源的路径。

links:
  - label: Navigation
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/breadcrumb
    target: _blank
---

::preview
#preview
:ExamplesStdBreadcrumbOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add breadcrumb
```

## API

### 属性

::props-table
---
data:
  - name: items
    type:
      - BreadcrumbItem[]
    description: 面包屑项
  - name: separator
    type:
      - string
    default: /
    description: 分隔符
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts [BreadcrumbItem]
interface BreadcrumbItem {
  label: string
  icon?: string
  to?: string
  class?: any
}
```

### 插槽

::slots-table
---
data:
  - name: separator
    description: 分隔符插槽
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex-(~ y-center)'
  - slot: item
    defaults: 'flex-(~ center)'
  - slot: icon
    defaults: 'c-toned mr-1'
  - slot: label
    defaults: 'text-sm'
  - slot: separator
    defaults: 'flex-(~ center) px-2.5 c-toned'
---
::
