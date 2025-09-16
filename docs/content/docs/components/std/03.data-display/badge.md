---
description: 显示徽章或看起来像徽章的组件。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/badge
    target: _blank
---

::preview
#preview
:ExamplesStdBadge{ text="Badge" }
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add badge
```

## API

### 属性

::props-table
---
data:
  - name: text
    type:
      - string
    description: 徽章文字
  - name: icon
    type:
      - string
    description: 徽章图标
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 徽章颜色
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: soft
    description: 徽章样式
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
    default: sm
    description: 徽章大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 徽章圆角
  - name: disabled
    type:
      - boolean
    default: false
    description: 徽章禁用状态
  - name: closable
    type:
      - boolean
    default: false
    description: 徽章可关闭状态
  - name: clickable
    type:
      - boolean
    default: false
    description: 徽章可点击状态
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
    description: 徽章文字
  - name: icon
    description: 徽章图标
  - name: close
    description: 徽章关闭按钮
---
::

### 事件

::emits-table
---
data:
  - name: close
    type:
      - () => void
    description: 徽章关闭事件
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'flex-(inline center) cursor-default select-none transition-colors'
  - slot: icon
    defaults: ''
  - slot: close
    defaults: 'relative flex-(~ center) c-current ml-1 hover:before:(abs abs-center block content-[""] rounded-full bg-current op-20) active:before:op-30 hover:cursor-pointer'
---
::

## 示例

### 颜色

::preview
#preview
:ExamplesStdBadgeColors

#code
```vue inset
<UiBadge color="accent">
  Text Badge
</UiBadge>
```
::

### 样式

::preview
#preview
:ExamplesStdBadgeVariants

#code
```vue inset
<UiBadge variant="solid">
  Text Badge
</UiBadge>
```
::

### 圆角

::preview
#preview
:ExamplesStdBadgeRadiuses

#code
```vue inset
<UiBadge radius="full">
  Text Badge
</UiBadge>
```
::

### 使用图标

::preview
#preview
:ExamplesStdBadge{ icon="user" text="Badge" }

#code
```vue inset
<UiBadge icon="user">
  Text Badge
</UiBadge>
```
::

### 仅图标

::preview
#preview
:ExamplesStdBadge{ icon="user" }

#code
```vue inset
<UiBadge icon="user" />
```
::

### 可关闭

::preview
#preview
:ExamplesStdBadgeClosable

#code
```vue inset
<UiBadge closable>
  Text Badge
</UiBadge>
```
::

### 可点击

::preview
#preview
:ExamplesStdBadge{ text="Click me!" :clickable=true }

#code
```vue inset
<UiBadge clickable>
  Click me!
</UiBadge>
```
::
