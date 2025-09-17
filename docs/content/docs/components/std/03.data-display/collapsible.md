---
description: 可展开/折叠面板的交互式组件。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/collapsible
    target: _blank
---

::preview
#preview
:ExamplesStdCollapsibleOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add collapsible
```

## API

### 属性

::props-table
---
data:
  - name: orientation
    type:
      - top
      - bottom
    default: bottom
    description: 展开方向
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
  - name: trigger
    description: 触发器
  - name: default
    description: 内容
---
::

### 事件

::emits-table
---
data:
  - name: update:open
    type:
      - '[value: boolean]'
    description: 展开/折叠事件
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: ''
  - slot: trigger
    defaults: ''
  - slot: content
    defaults: 'overflow-hidden will-change-height state-open:animate-collapse-open state-closed:animate-collapse-close'
---
::
