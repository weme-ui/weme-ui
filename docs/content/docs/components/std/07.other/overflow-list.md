---
description: 一个容器组件，用于隐藏超出数量限制的子组件。

links:
  - label: Other
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/overflow-list
    target: _blank
---

::preview
#preview
:ExamplesStdOverflowListOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add overflow-list
```

## API

### 属性

::props-table
---
data:
  - name: max
    type:
      - number
    description: 最大显示数量
  - name: gap
    type:
      - none
      - sm
      - md
      - lg
    default: sm
    description: 项目间距
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
    description: 默认插槽
  - name: overflow
    description: 超出数量插槽
    payload:
      - "(number: number) => void"
---
::
