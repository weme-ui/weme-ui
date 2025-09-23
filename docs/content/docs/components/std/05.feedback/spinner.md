---
description: 用于显示动画加载指示器。

links:
  - label: Feedback
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/spinner
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdSpinnerOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add spinner
```

## API

### 属性

::props-table
---
data:
  - name: icon
    type:
      - string
    default: loading
    description: 图标
  - name: description
    type:
      - string
    description: 描述
  - name: animate
    type:
      - boolean
    default: false
    description: 是否动画
  - name: loading
    type:
      - boolean
    default: false
    description: 是否加载
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
    description: 加载内容
  - name: description
    description: 描述
---
::
