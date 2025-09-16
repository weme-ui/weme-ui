---
description: 增强原生滚动功能，提供跨浏览器的自定义样式支持。

links:
  - label: Other
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/scroll-area
    target: _blank
---

::preview
#preview
:ExamplesStdScrollAreaOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add scroll-area
```

## API

### 属性

::props-table
---
data:
  - name: as
    type:
      - string
    default: div
    description: 根元素类型
  - name: type
    type:
      - auto
      - always
      - scroll
      - never
    default: auto
    description: 滚动条类型
  - name: scrollHideDelay
    type:
      - number
    default: 1000
    description: 滚动条隐藏延迟时间
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
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'relative overflow-hidden'
  - slot: viewport
    defaults: 'size-full scroll-smooth rounded-inherit'
  - slot: scrollbar
    defaults: 'flex select-none touch-none bg-transparent'
  - slot: thumb
    defaults: 'relative z-11 flex-1 bg-border rounded-lg hover:bg-neutral-8'
---
::
