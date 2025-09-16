---
description: 用于视觉或语义上分隔内容的组件。

links:
  - label: Layout
    icon: lucide:component
    to: /docs/std/components/layout
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/separator
    target: _blank
---

::preview
#preview
:ExamplesStdSeparator{ text="Gradient" variant="dotted" }
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add separator
```

## API

### 属性

::props-table
---
data:
  - name: text
    type:
      - string
    description: 分隔符文字
  - name: variant
    type:
      - solid
      - dashed
      - dotted
      - gradient
    default: solid
    description: 分隔符样式
  - name: orientation
    type:
      - horizontal
      - vertical
    default: horizontal
    description: 分隔符方向
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
    description: 分隔符文字
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'relative shrink-0'
  - slot: text
    defaults: 'abs-(~ center) flex-(~ center) text-(xs toned) select-none bg-white-12'
---
::

## 示例

### 样式

::preview{ orientation="horizontal" class="gap-y-8" }
#preview
:ExamplesStdSeparator{ variant="solid" }
:ExamplesStdSeparator{ variant="dashed" }
:ExamplesStdSeparator{ variant="dotted" }
:ExamplesStdSeparator{ variant="gradient" }

#code
```vue inset
<UiSeparator variant="dashed" />
```
::

### 方向

::preview{ orientation="horizontal" class="gap-y-8" }
#preview
:ExamplesStdSeparator{ orientation="horizontal" }
::div{ class="h-10" }
:ExamplesStdSeparator{ orientation="vertical" }
::

#code
```vue inset
<UiSeparator orientation="vertical" />
```
::

### 文字

::preview{ orientation="horizontal" class="gap-y-8" }
#preview
:ExamplesStdSeparator{ text="Text" }

#code
```vue inset
<UiSeparator text="Text" />
```
::
