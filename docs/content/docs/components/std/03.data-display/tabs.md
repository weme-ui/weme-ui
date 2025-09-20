---
description: 一组分层的内容区域（称为标签面板），一次只显示一个。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/tabs
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdTabsOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add tabs
```

## 使用

```vue-html
<UiTabs>
  <UiTabsContent />
</UiTabs>
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - string
    default: ''
    description: 当前选中项 (v-model)
  - name: variant
    type:
      - normal
      - underline
      - capsule
      - card
    default: normal
    description: 样式
  - name: side
    type:
      - top
      - right
      - bottom
      - left
    default: top
    description: 位置
  - name: size
    type:
      - xs
      - sm
      - md
      - lg
    default: sm
    description: 大小
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
      - full
    default: md
    description: 圆角
  - name: animate
    type:
      - boolean
    default: true
    description: 是否开启动画
  - name: class
    type:
      - any
    description: 自定义样式
---
::
