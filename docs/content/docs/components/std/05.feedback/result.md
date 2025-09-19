---
description: 用于展示操作结果，可以展示标题、描述、图片、操作按钮等。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/result
    target: _blank
---

::preview
#preview
:ExamplesStdResultOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add result
```

## API

### 属性

::props-table
---
data:
  - name: icon
    type:
      - string
    description: 图标
  - name: title
    type:
      - string
    description: 标题
  - name: description
    type:
      - string
    description: 描述
  - name: type
    type:
      - info
      - success
      - warning
      - error
    description: 类型
  - name: size
    type:
      - sm
      - md
      - lg
      - xl
    default: lg
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
  - name: icon
    description: 图标
  - name: title
    description: 标题
  - name: description
    description: 描述
  - name: action
    description: 操作按钮
  - name: default
    description: 额外内容
---
::
