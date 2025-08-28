---
description: 显示按钮或看起来像按钮的组件。

links:
  - label: General
    icon: lucide:component
    to: /docs/std/components/general
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/button
    target: _blank
---

::preview
#preview
:ExamplesStdButton{ size="lg" }
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add std/button
```

## API

### 属性

::props-table
---
data:
  - name: text
    type:
      - string
    description: 按钮文字
  - name: icon
    type:
      - string
    description: 按钮图标
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 按钮颜色
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - ghost
      - link
      - inverse
    default: solid
    description: 按钮样式
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 按钮大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 按钮圆角
  - name: loading
    type:
      - boolean
    default: false
    description: 按钮加载状态
  - name: disabled
    type:
      - boolean
    default: false
    description: 按钮禁用状态
  - name: square
    type:
      - boolean
    default: false
    description: 按钮是否为正方形
  - name: class
    type:
      - any
    description: 自定义样式
---
::

### 事件

::emits-table
---
data:
  - name: click
    description: 按钮点击事件
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex-(inline center) cursor-button font-medium select-none transition-colors'
  - slot: icon
    defaults: ''
  - slot: loading
    defaults: ''
---
::

## 示例

### 样式

::preview
#preview
:ExamplesStdButtonVariants

#code
```vue inset
<UiButton variant="solid">
  Button
</UiButton>
```
::

### 颜色

::preview
#preview
:ExamplesStdButtonColors

#code
```vue inset
<UiButton color="accent">
  Button
</UiButton>
```
::

### 尺寸

::preview
#preview
:ExamplesStdButtonSizes

#code
```vue inset
<UiButton size="lg">
  Button
</UiButton>
```
::

### 圆角

::preview
#preview
:ExamplesStdButtonRadiuses

#code
```vue inset
<UiButton radius="full">
  Button
</UiButton>
```
::

### 加载中

::preview
#preview
:ExamplesStdButton{ loading=true }

#code
```vue inset
<UiButton loading>
  Button
</UiButton>
```
::

### 禁用

::preview
#preview
:ExamplesStdButton{ disabled=true }

#code
```vue inset
<UiButton disabled>
  Button
</UiButton>
```
::
