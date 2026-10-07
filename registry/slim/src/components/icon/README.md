# Icon

用于展示图标的组件，基于 `@iconify/vue` 封装；优先使用 `name`，也可用 `icon` 作为别名。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/icon
```

## Usage

## Props

| 属性         | 说明                                      | 类型                                 | 默认值 |
| ------------ | ----------------------------------------- | ------------------------------------ | ------ |
| `name`       | 图标名称或 Iconify 图标数据（必填）       | `IconifyIcon \| string`              | —      |
| `icon`       | `name` 的别名；同时传入时以 `icon` 为准   | `IconifyIcon \| string`              | —      |
| `class`      | 根节点额外 class                          | `any`                                | —      |
| `mode`       | 渲染模式（透传 `@iconify/vue`）           | `'style' \| 'bg' \| 'mask' \| 'svg'` | —      |
| `color`      | 图标颜色（透传）                          | `string`                             | —      |
| `width`      | 宽度（透传）                              | `string \| number \| null`           | —      |
| `height`     | 高度（透传）                              | `string \| number \| null`           | —      |
| `flip`       | 翻转（透传）                              | `string`                             | —      |
| `rotate`     | 旋转（透传）                              | `string \| number`                   | —      |
| `inline`     | 是否按 inline 对齐（透传）                | `boolean`                            | —      |
| `ariaHidden` | 是否对辅助技术隐藏（透传 `@iconify/vue`） | `boolean \| string`                  | —      |

其余未列出的属性同样透传自 `@iconify/vue` 的 `IconifyIconProps`（已用 `name` 取代必填的 `icon`）。

## Accessibility

基于 `@iconify/vue`。装饰性图标可通过 `ariaHidden` 对辅助技术隐藏；若图标表达独立含义，勿盲目隐藏，并确保有等效文本（如邻近文案或可访问名称）。
