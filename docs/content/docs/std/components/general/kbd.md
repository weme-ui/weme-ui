---
description: 用于显示键盘按键的组件。

links:
  - label: General
    icon: lucide:component
    to: /docs/std/components/general
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/kbd
    target: _blank
---

::preview
#preview
:ExamplesStdKbdMeta
::

## 特性

::features
---
list:
  - 自适配系统按键 `meta`、`alt` 和 `ctrl` 键会自动转换为 `Cmd`、`Opt` 和 `Ctrl`。
---
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add std/kbd
```

## API

### 属性

::props-table
---
data:
  - name: value
    type:
      - string
    description: 按键值
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 按键颜色
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: soft
    description: 按键样式
  - name: size
    type:
      - sm
      - md
      - lg
    default: md
    description: 按键大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: sm
    description: 按键圆角
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
    description: 按键值
---
::

## 示例

### 颜色样式

::preview
#preview
:ExamplesStdKbdColors

#code
```vue inset
<UiKbd value="meta" color="accent" variant="soft" />
```
::

### 尺寸

::preview
#preview
:ExamplesStdKbdSizes

#code
```vue inset
<UiKbd value="meta" size="lg" />
```
::

### 圆角

::preview
#preview
:ExamplesStdKbdRadiuses

#code
```vue inset
<UiKbd value="meta" radius="full" />
```
::

### 系统按键

::preview
#preview
:ExamplesStdKbdMeta

#code
```vue inset
<UiKbd value="meta" />

<UiKbd value="ctrl" />

<UiKbd value="alt" />
```
::
