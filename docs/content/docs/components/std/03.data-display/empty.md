---
description: 当没有对应的数据内容时渲染的默认状态。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/empty
    target: _blank
---

::preview
#preview
:ExamplesStdEmptyOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add empty
```

## API

### 属性

::props-table
---
data:
  - name: icon
    type:
      - string
    description: 图标名称
  - name: src
    type:
      - string
    description: 图片地址
  - name: description
    type:
      - string
    description: 描述
  - name: type
    type:
      - empty
      - notfound
      - forbidden
      - search
    description: 类型
  - name: size
    type:
      - sm
      - md
      - lg
    default: md
    description: 大小
  - name: simple
    type:
      - boolean
    default: false
    description: 简约模式
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
  - name: image
    description: 图标/图片
  - name: default
    description: 内容
---
::
