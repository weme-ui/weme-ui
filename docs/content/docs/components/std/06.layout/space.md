---
description: 设置组件之间的间距和分隔符。

links:
  - label: Layout
    icon: lucide:component
    to: /docs/std/components/layout
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/space
    target: _blank
---

::preview
#preview
:ExamplesStdSpace
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add space
```

## API

### 属性

::props-table
---
data:
  - name: align
    type:
      - start
      - center
      - end
      - stretch
    default: center
    description: 对齐方式
  - name: orientation
    type:
      - horizontal
      - vertical
    default: horizontal
    description: 排列方向
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: sm
    description: 间距大小
  - name: wrap
    type:
      - boolean
    default: false
    description: 是否换行
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
  - name: separator
    description: 分隔符插槽
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex'
  - slot: item
    defaults: ''
  - slot: separator
    defaults: 'c-muted'
---
::

## 示例

### 基础使用

::preview
#preview
:ExamplesStdSpaceBasic

#code
```vue-html inset
<UiSpace>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</UiSpace>
```
::

### 对齐方式

::preview
#preview
:ExamplesStdSpaceAlign

#code
```vue-html inset
<UiSpace align="start">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</UiSpace>
```
::

### 间隔大小

::preview
#preview
:ExamplesStdSpaceSize

#code
```vue-html inset
<UiSpace size="lg">
  <UiButton>Item 1</UiButton>
  <UiButton>Item 2</UiButton>
  <UiButton>Item 3</UiButton>

  <template #separator>
    <UiSeparator />
  </template>
</UiSpace>
```
::

### 分隔符

::preview
#preview
:ExamplesStdSpaceSeparator

#code
```vue-html inset
<UiSpace>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>

  <template #separator>
    <div class="h-auto">
      /
    </div>
  </template>
</UiSpace>
```
::
