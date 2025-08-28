---
description: 文本样式，标题，段落，引用，小字... 等

links:
  - label: General
    icon: lucide:component
    to: /docs/std/components/general
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/typography
    target: _blank
---

::preview
#preview
:ExamplesStdTypography
::

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add std/typography
```

## API

### 属性

::props-table
---
data:
  - name: as
    type:
      - h1
      - h2
      - h3
      - h4
      - h5
      - h6
      - p
      - blockquote
      - small
    default: p
    description: 元素类型
  - name: color
    type:
      - highlighted
      - default
      - toned
      - muted
      - dimmed
    default: default
    description: 文字颜色
  - name: value
    type:
      - string
    description: 文字内容
  - name: class
    type:
      - any
    description: 自定义样式
---
::

## 示例

### 标题

::preview
#preview
:ExamplesStdTypographyHeading

#code
```vue inset
<UiTypography as="h1">
  Heading
</UiTypography>
```
::

### 段落

::preview
#preview
:ExamplesStdTypographyParagraph

#code
```vue inset
<UiTypography value="Paragraph" />
```
::

### 引用

::preview
#preview
:ExamplesStdTypographyBlockquote

#code
```vue inset
<UiTypography value="Blockquote" as="blockquote" />
```
::

### 小字

::preview
#preview
:ExamplesStdTypographySmall

#code
```vue inset
<UiTypography value="Small" as="small" />
```
::
