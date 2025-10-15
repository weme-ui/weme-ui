---
description: 用于选择日期的日历组件。

links:
  - label: Data Display
    icon: lucide:stretch-horizontal
  - label: Calendar
    icon: lucide:component
    to: https://reka-ui.com/docs/components/calendar
    target: _blank
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/calendar
    target: _blank
---

::preview
#preview
:ExamplesStdCalendarOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add calendar
```

## API

### 属性

::props-table
---
data:
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
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
      - xl
    default: md
    description: 大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: sm
    description: 圆角
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
  - name: header
    payload:
      - "currentDate: DateValue"
    description: 日历头部
  - name: prev
    payload:
      - "currentDate: boolean"
    description: 日历上一个月按钮
  - name: next
    payload:
      - "currentDate: boolean"
    description: 日历下一个月按钮
  - name: heading
    payload:
      - "headingValue: string"
    description: 日历标题
  - name: day
    payload:
      - "date: DateValue"
    description: 日历日期
---
::
