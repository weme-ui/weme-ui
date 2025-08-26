---
description: 显示来自 Iconify 的任何图标的组件。

links:
  - label: General
    icon: lucide:component
    to: /docs/std/components/general
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/blob/main/registry/std/components/icon
    target: _blank
---

------

::preview
#preview
:ExamplesStdIcon

#code
```vue inset
<Icon name="info" class="size-6" />
```
::

## 特性

::features
---
list:
  - 通过 [Iconify](https://iconify.design/) 提供超过 `275,000` 个开源矢量图标
  - 支持 CSS 模式和 SVG 模式
  - 支持自定义 SVG 图标
---
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add std/icon
```

## API

### 属性

::props-table
---
data:
  - name: name
    type:
      - string
    default: ''
    description: 图标名称
    required: true
  - name: mode
    type:
      - svg
      - css
    default: svg
    description: 图标模式
---
::

### 内建图标

::data-table{ name="别名" description="图标名称" }
---
data:
  - name: arrowUp
    description: lucide:arrow-up
  - name: arrowRight
    description: lucide:arrow-right
  - name: arrowDown
    description: lucide:arrow-down
  - name: arrowLeft
    description: lucide:arrow-left
  - name: up
    description: lucide:chevron-up
  - name: right
    description: lucide:chevron-right
  - name: down
    description: lucide:chevron-down
  - name: left
    description: lucide:chevron-left
  - name: select
    description: lucide:chevrons-up-down
  - name: check
    description: lucide:check
  - name: close
    description: lucide:x
  - name: plus
    description: lucide:plus
  - name: minus
    description: lucide:minus
  - name: more
    description: lucide:ellipsis
  - name: search
    description: lucide:search
  - name: refresh
    description: lucide:refresh-cw
  - name: info
    description: lucide:info
  - name: success
    description: lucide:circle-check
  - name: warning
    description: lucide:triangle-alert
  - name: error
    description: lucide:circle-x
  - name: help
    description: lucide:help-circle
  - name: external
    description: lucide:arrow-up-right
  - name: user
    description: lucide:user-round
  - name: loading
    description: mingcute:loading-line
---
::

## 示例

::preview
#preview
:ExamplesStdIconBuiltin
::
