---
icon: lucide:info
title: 介绍
description: 基于 Reka UI 和 UnoCSS 的可复用 UI 组件库
links:
  - label: 通用
    icon: lucide:box
  - label: 0.1.4
    icon: lucide:info
  - label: 16.3 kb
    icon: lucide:gauge
  - label: Button
    icon: custom:reka-ui
    to: https://github.com/weme-ui/weme-ui
    target: _blank
    rel: noopener noreferrer
  - label: 源代码
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui
    target: _blank
    rel: noopener noreferrer
---

## Headings

::preview
::code-group
```bash [pnpm]
pnpm dlx @weme-ui/weme-ui add button
```

```bash [npm]
npx @weme-ui/weme-ui add button
```

```bash [yarn]
yarn dlx @weme-ui/weme-ui add button
```
::

#code
::code-group
```bash [pnpm]
pnpm dlx @weme-ui/weme-ui add button
```

```bash [npm]
npx @weme-ui/weme-ui add button
```

```bash [yarn]
yarn dlx @weme-ui/weme-ui add button
```
::
::

# h1
## h2
### h3
#### h4
##### h5
###### h6

## Text formatting

::collapsible{ icon="lucide:info" }
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
::

::accordion
---
items:
  - title: Item 1
    icon: lucide:info
    content: Content 1
    value: item-1
  - title: Item 2
    icon: lucide:info
    content: Content 2
    value: item-2
---
::

------

::code-group
```bash [pnpm]
pnpm dlx @weme-ui/weme-ui add button
```

```bash [npm]
npx @weme-ui/weme-ui add button
```

```bash [yarn]
yarn dlx @weme-ui/weme-ui add button
```
::

------

::code-collapse
```json [config.json] {2}
{
  "name": "weme-ui",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "version": "0.1.4",
  "size": "16.3 kb"
}
```
::

## Links

[Link](https://github.com/weme-ui/weme-ui)

## Blockquote

::card-group
::card{ title="Blockquote" description="This is a blockquote." icon="lucide:quote" to="/docs/get-started" }
::
::card{ title="Blockquote" description="This is a blockquote." icon="lucide:quote" to="/docs/get-started" }
::
::card{ title="Blockquote" description="This is a blockquote." icon="lucide:quote" to="/docs/get-started" }
::
::card{ title="Blockquote" description="This is a blockquote." icon="lucide:quote" to="/docs/get-started" }
::
::

> Blockquote

- I'm a list item.
  - I'm a nested list item.
  - I'm another nested list item.
- I'm another list item.
  - Another nested item
    - Deep nested item
    - Another deep nested item
  - Back to second level

1. First major step
   - Sub-requirement A
   - Sub-requirement B
2. Second major step
   - Another sub-item
   - Final sub-item
3. Final step

## Table

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |

## Badge

::badge{ color="info" }
v1.0.0
::

## Alert

::alert{ variant="surface" icon="lucide:info" title="Info" }
This is an `@alert`.

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
::

::alert{ type="info" title="Info" }
This is an `@alert`.

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
::

::alert{ type="success" title="Info" }
This is an `@alert`.

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
::

::alert{ type="warning" title="Info" }
This is an `@alert`.

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
::

::alert{ type="error" title="Info" }
This is an `@alert`.

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
::

::alert{ variant="surface" type="error" href="https://github.com/weme-ui/weme-ui" target="_blank" rel="noopener noreferrer" }
This is an `alert`.
::

## Code blocks

```json [weme.config.json] {2}
{
  "name": "weme-ui",
  "version": "0.1.4",
  "size": "16.3 kb"
}
```

------

```diff [weme.config.json]
{
  "name": "weme-ui",
-  "version": "0.1.4",
+  "size": "16.3 kb"
}
```

------

```json
{
  "name": "weme-ui",
  "version": "0.1.4",
  "size": "16.3 kb"
}
```

`const a = 1`{lang="ts"}
