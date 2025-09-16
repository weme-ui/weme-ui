---
description: 卡片组件

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/card
    target: _blank
---

::preview
#preview
:ExamplesStdCardOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add card
```

## API

### 属性

::props-table
---
data:
  - name: title
    type:
      - string
    description: 标题
  - name: description
    type:
      - string
    description: 描述
  - name: icon
    type:
      - string
    description: 图标
  - name: variant
    type:
      - normal
      - wrapped
    default: normal
    description: 样式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: lg
    description: 圆角
  - name: bordered
    type:
      - boolean
    default: false
    description: 边框
  - name: translucent
    type:
      - boolean
    default: false
    description: 半透明
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
    description: 内容
  - name: icon
    description: 图标
  - name: title
    description: 标题
  - name: description
    description: 描述
  - name: action
    description: 操作
  - name: footer
    description: 底部
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'relative'
  - slot: wrapper
    defaults: 'flex-(~ col)'
  - slot: header
    defaults: 'flex gap-x-2 px-6 py-4.5 text-highlighted'
  - slot: icon
    defaults: 'text-5 mt-0.5'
  - slot: title
    defaults: 'text-lg font-semibold'
  - slot: description
    defaults: 'text-sm'
  - slot: content
    defaults: 'flex-1 p-6'
  - slot: footer
    defaults: 'px-6 py-4.5'
---
::

## 示例

### 基础使用

::preview{ :inverse=true }
#preview
:ExamplesStdCardBasic

#code
```vue inset
<Card icon="info" title="Title" description="Description">
  This is the content.

  <template #action>
    Action
  </template>

  <template #footer>
    Footer
  </template>
</Card>
```
::

### 样式

::preview{ orientation="horizontal" }
#preview
:ExamplesStdCardVariants

#code
```vue inset
<Card icon="info" title="Title" description="Description" variant="wrapped">
  This is the content.

  <template #action>
    Action
  </template>

  <template #footer>
    Footer
  </template>
</Card>
```
::

### 边框

::preview{ orientation="horizontal" }
#preview
:ExamplesStdCardBordered

#code
```vue inset
<Card icon="info" title="Title" description="Description" bordered>
  This is the content.

  <template #action>
    Action
  </template>

  <template #footer>
    Footer
  </template>
</Card>
```
::

### 半透明

::preview{ orientation="horizontal" :inverse=true }
#preview
:ExamplesStdCardTranslucent

#code
```vue inset
<Card icon="info" title="Title" description="Description" translucent>
  This is the content.

  <template #action>
    Action
  </template>

  <template #footer>
    Footer
  </template>
</Card>
```
::
