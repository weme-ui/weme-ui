---
title: 按钮 Button
description: 显示按钮或看起来像按钮的组件。
links:
  - label: 通用
    icon: lucide:box
  - label: $version
    icon: lucide:info
  - label: 源代码
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/button
    target: _blank
    rel: noopener noreferrer
---

::preview
:ExampleButtonOverview
::

## 安装

::code-group
```bash [pnpm]
pnpm dlx @weme-ui/weme-ui add button
```

```bash [npm]
npx @weme-ui/weme-ui add button
```

```bash [yarn]
yarn @weme-ui/weme-ui add button
```
::

## 使用

## API

::props-table
---
data:
  - name: as
    type: 
      - string
    default: button
    description: 指定根元素的标签名。
  - name: asChild
    type: 
      - boolean
    default: false
    description: 是否将 `props` 传递给子元素而不是根元素。
  - name: type
    type: 
      - string
    default: button
    description: 指定按钮的类型。
  - name: text
---
::

::emits-table
---
data:
  - name: click
    payload: 
      - "[event: MouseEvent]"
    description: 按钮的文本内容。
---
::

::slots-table
---
data:
  - name: default
    payload: 
      - string
    description: 按钮的文本内容。
---
::

::data-table
---
data:
  - name: data-state
    value: 
      - open
      - closed
    description: 按钮的文本内容。
---
::

::css-table
---
data:
  - name: --ui-card-bg 
    value: 
      - "#fff"
    description: 按钮的文本内容。
---
::
