---
description: 用于显示需要用户注意的提示信息。

links:
  - label: Data Display
    icon: lucide:component
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/alert
    target: _blank
---

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ icon="info" title="Alert" content="This is an alert." variant="outline" }
::

## 特性

::features
---
list:
  - 平滑的 [Motion Vue](https://motion.unovue.com/){target="_blank"} 过渡动画
---
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add alert
```

## API

### 属性

::props-table
---
data:
  - name: modelValue
    type:
      - boolean
    default: true
    description: 是否可见 (v-model)
  - name: icon
    type:
      - string
    description: 图标
  - name: title
    type:
      - string
    description: 标题
  - name: content
    type:
      - string
    description: 内容
  - name: href
    type:
      - string
    description: 链接
  - name: target
    type:
      - string
    description: 链接目标
  - name: rel
    type:
      - string
    description: 链接关系
  - name: type
    type:
      - info
      - success
      - warning
      - error
    default: info
    description: 类型
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
  - name: variant
    type:
      - solid
      - soft
      - surface
      - outline
      - inverse
    default: soft
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
  - name: clickable
    type:
      - boolean
    default: false
    description: 可点击
  - name: closable
    type:
      - boolean
    default: false
    description: 可关闭
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
  - name: close
    description: 关闭按钮
---
::

### 事件

::emits-table
---
data:
  - name: close
    type:
      - () => void
    description: 关闭事件
---
::

### 样式

::styles-table
---
data:
  - slot: base
    defaults: 'relative flex grow-1 gap-2 p-4 transition text-left cursor-default'
  - slot: icon
    defaults: 'size-4'
  - slot: wrapper
    defaults: 'space-y-2 grow-1'
  - slot: title
    defaults: 'text-4 font-medium tracking-tight leading-none'
  - slot: content
    defaults: 'text-sm leading-none op-70'
---
::

## 示例

### 基础使用

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ icon="info" content="This is an alert." }

#code
```vue inset
<UiAlert icon="info" content="This is an alert." />
```
::

### 类型

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ type="info" title="Info" content="This is an alert." }
:ExamplesStdAlert{ type="success" title="Success" content="This is an alert." }
:ExamplesStdAlert{ type="warning" title="Warning" content="This is an alert." }
:ExamplesStdAlert{ type="error" title="Error" content="This is an alert." }

#code
```vue inset
<UiAlert type="info" title="Info" content="This is an alert." />
```
::

### 样式

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ icon="info" variant="solid" color="info" content="This is an alert." }
:ExamplesStdAlert{ icon="info" variant="soft" color="success" content="This is an alert." }
:ExamplesStdAlert{ icon="info" variant="surface" color="warning" content="This is an alert." }
:ExamplesStdAlert{ icon="info" variant="outline" color="error" content="This is an alert." }

#code
```vue inset
<UiAlert icon="info" content="This is an alert." variant="solid" />
```
::

### 颜色

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ icon="info" color="accent" variant="solid" content="This is an alert." }
:ExamplesStdAlert{ icon="info" color="neutral" variant="solid" content="This is an alert." }
:ExamplesStdAlert{ icon="info" color="info" variant="solid" content="This is an alert." }
:ExamplesStdAlert{ icon="info" color="success" variant="solid" content="This is an alert." }
:ExamplesStdAlert{ icon="info" color="warning" variant="solid" content="This is an alert." }
:ExamplesStdAlert{ icon="info" color="error" variant="solid" content="This is an alert." }

#code
```vue inset
<UiAlert icon="info" content="This is an alert." color="accent" variant="solid" />
```
::

### 反转

::preview{ orientation="horizontal" :inverse=true }
#preview
:ExamplesStdAlert{ icon="info" variant="inverse" content="This is an alert." }

#code
```vue inset
<UiAlert icon="info" content="This is an alert." variant="inverse" />
```
::

### 可点击

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ icon="info" content="This is an alert." variant="outline" :clickable=true }
:ExamplesStdAlert{ icon="info" content="This is a link." variant="outline" color="success" href="https://github.com/weme-ui/weme-ui" target="_blank" }

#code
```vue inset
<UiAlert icon="info" content="This is an alert." variant="outline" clickable />
```
::

### 可关闭

::preview{ orientation="horizontal" }
#preview
:ExamplesStdAlert{ icon="info" title="Alert" content="This is an alert." variant="outline" :closable=true }
:ExamplesStdAlert{ icon="info" content="This is an alert." variant="outline" :closable=true }

#code
```vue inset
<UiAlert icon="info" content="This is an alert." variant="outline" closable />
```
::
