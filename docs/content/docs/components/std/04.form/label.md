---
description: 呈现与控件关联的可访问标签。

links:
  - label: Form
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/label
    target: _blank
---

::preview
#preview
:ExamplesStdLabelOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add label
```

## API

### 属性

::props-table
---
data:
  - name: hint
    type:
      - string
    description: 提示文本
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
    description: 标签文本
  - name: hint
    description: 提示文本
---
::
