# Icon Stack

带层叠纸片背景的装饰性图标展示，适合空态、引导页或功能入口。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/icon-stack
```

## Usage

## Props

| 属性       | 说明                                                                               | 类型                                                                   | 默认值  |
| ---------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| `as`       | 渲染为的元素或组件（Reka UI `Primitive`）                                          | `AsTag \| Component`                                                   | `'div'` |
| `asChild`  | 合并到子元素上渲染（Reka UI composition）                                          | `boolean`                                                              | —       |
| `icon`     | 前景图标名称或 Iconify 图标数据                                                    | `IconifyIconProps['icon']`                                             | —       |
| `color`    | 层叠背景与图标色彩                                                                 | `'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | —       |
| `size`     | 尺寸                                                                               | `'xs' \| 'sm' \| 'md' \| 'lg'`                                         | `'sm'`  |
| `contentX` | 前景内容水平位置（CSS 长度，写入 CSS 变量）                                        | `string`                                                               | `'71%'` |
| `contentY` | 前景内容垂直位置（CSS 长度，写入 CSS 变量）                                        | `string`                                                               | `'58%'` |
| `class`    | 根节点额外 class                                                                   | `any`                                                                  | —       |
| `ui`       | 覆盖 slots 样式（`root` / `layerWrapper` / `ellipse` / `iconWrapper` / `icon` 等） | `Partial<IconStackStyleSlots>`                                         | —       |

## Slots

| 插槽      | 说明                                                  |
| --------- | ----------------------------------------------------- |
| `default` | 自定义前景内容；未提供且传入 `icon` 时渲染内置 `Icon` |

## Accessibility

层叠 SVG 使用 `aria-hidden="true"`，作为装饰性背景。若前景图标表达独立含义，请在相邻元素提供等效文本，或通过 `default` 插槽自行提供可访问内容。
