---
description: 用于展示带有日期、标题、图标的事件序列的组件。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/timeline
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdTimelineOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add timeline
```

## API

### 属性

::props-table
---
data:
  - name: items
    type:
      - TimelineItem[]
    description: 时间线项
  - name: color
    type:
      - accent
      - neutral
      - info
      - success
      - warning
      - error
    default: accent
    description: 颜色
  - name: orientation
    type:
      - vertical
      - horizontal
    default: vertical
    description: 方向
  - name: reverse
    type:
      - boolean
    default: false
    description: 是否反转
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 大小
  - name: iconProps
    type:
      - Partial<IconBoxProps>
    description: 图标属性
    default: { variant: 'soft', radius: 'full', size: 'md' }
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts[TimelineItem]
interface TimelineItem {
  date?: string
  icon?: string
  title?: string
  description?: string
  slot?: string
  color?: TimelineStyleProps['color']
  iconProps?: Partial<Omit<IconBoxProps, 'name'>>
  separatorProps?: Partial<Omit<SeparatorProps, 'orientation'>>
  class?: any
  ui?: Partial<Pick<
    TimelineStyleSlots,
    | 'item'
    | 'wrapper'
    | 'indicator'
    | 'icon'
    | 'separator'
    | 'content'
    | 'date'
    | 'title'
    | 'description'
  >>
  [key: string]: any
}
```

### 插槽

::slots-table
---
data:
  - name: indicator
    payload:
      - "item: TimelineItem"
    description: 指示器
  - name: date
    payload:
      - "item: TimelineItem"
    description: 日期
  - name: title
    payload:
      - "item: TimelineItem"
    description: 标题
  - name: description
    payload:
      - "item: TimelineItem"
    description: 描述
---
::
