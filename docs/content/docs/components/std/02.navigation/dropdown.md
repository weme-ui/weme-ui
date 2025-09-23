---
description: 向用户显示菜单 — 例如一组由按钮触发的操作或功能。

links:
  - label: Navigation
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/dropdown
    target: _blank
---

::preview
#preview
:ExamplesStdDropdownOverview
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add dropdown
```

## API

### 属性

::props-table
---
data:
  - name: items
    type:
      - DropdownItem[] | DropdownItem[][]
    description: 下拉项
  - name: side
    type:
      - top
      - right
      - bottom
      - left
    default: bottom
    description: 弹出位置
  - name: radius
    type:
      - none
      - sm
      - md
      - lg
      - xl
    default: lg
    description: 弹出圆角
  - name: translucent
    type:
      - boolean
    default: false
    description: 弹出是否半透明
  - name: disabled
    type:
    default: false
    description: 是否禁用
  - name: showArrow
    type:
      - boolean
    default: true
    description: 是否显示箭头
  - name: portalProps
    type:
      - DropdownMenuPortalProps
    description: 弹出层属性
  - name: class
    type:
      - any
    description: 自定义样式
---
::

```ts[DropdownItem]
export interface DropdownItem {
  label?: string
  value?: string
  icon?: string
  type?: 'label' | 'link' | 'checkbox' | 'separator'
  shortcuts?: KbdProps['value'][] | KbdProps[]
  append?: string
  disabled?: boolean
  checked?: boolean
  loading?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  class?: any
  children?: DropdownItem[] | DropdownItem[][]
  onSelect?: (e: Event) => void
  onCheck?: (checked: boolean) => void
  [key: string]: any
}
```

### 插槽

::slots-table
---
data:
  - name: top
    description: 弹出层顶部内容
  - name: bottom
    description: 弹出层底部内容
---
::
