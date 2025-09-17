---
description: 显示来自 Iconify 的任何图标的组件。

links:
  - label: General
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/icon
    target: _blank
---

------

::preview
#preview
:ExamplesStdIconBuiltin
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
$ pnpm dlx @weme-ui/weme-ui add icon
```

## Icon

::preview
#preview
:ExamplesStdIcon{ name="weme:logo" class="size-10 c-accent-9" }

#code
```vue inset
<UiIcon name="weme:logo" />
```
::

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
  - name: class
    type:
      - any
    description: 自定义样式
---
::

### 内建图标

::preview
#preview
:ExamplesStdIcon{ name="user" }

#code
```vue inset
<UiIcon name="user" />
```
::

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

## IconBox

::preview
#preview
:ExamplesStdIconVariants

#code
```vue inset
<UiIconBox name="info" variant="solid" />
```
::

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
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 图标颜色
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: soft
    description: 图标样式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 图标圆角
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 图标大小
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex-(~ center)'
  - slot: icon
    defaults: ''
---
::

#### 自定义样式

```vue
<UiIconBox
  name="info"
  :ui="{
    base: 'bg-accent-1',
    icon: 'c-accent-12',
  }"
/>
```

### 示例

#### 颜色与样式

::preview
#preview
:ExamplesStdIconColors

#code
```vue inset
<UiIconBox name="info" color="error" />
```
::

#### 图标尺寸

::preview
#preview
:ExamplesStdIconSizes

#code
```vue inset
<UiIconBox name="info" size="lg" />
```
::

#### 圆角

::preview
#preview
:ExamplesStdIconRadiuses

#code
```vue inset
<UiIconBox name="info" radius="full" />
```
::
