---
description: 一组垂直堆叠的可交互标题，每个标题都可以展开显示相关的内容区域。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/accordion
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAccordionOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add accordion
```

## API

### 属性

::props-table
---
data:
  - name: items
    type:
      - AccordionItem[]
    description: 选项卡数据
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: neutral
    description: 颜色
  - name: variant
    type:
      - normal
      - underline
      - card
      - table
    default: normal
    description: 样式
  - name: align
    type:
      - start
      - center
      - end
    default: start
    description: 对齐方式
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: md
    description: 圆角
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts[AccordionItem]
export interface AccordionItem {
  title: string
  content: string | VNode
  value: string
  icon?: string
  description?: string
  disabled?: boolean
}
```

### 插槽

::slots-table
---
data:
  - name: content
    description: 选项卡内容
  - name: icon
    description: 选项卡图标
  - name: title
    description: 选项卡标题
  - name: description
    description: 选项卡描述
  - name: arrow
    description: 选项卡箭头
---
::
