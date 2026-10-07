# Icon Tile

带背景与圆角的图标容器，适合作为列表、导航或状态的视觉标记。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/icon-tile
```

## Usage

## Props

| 属性      | 说明                                      | 类型                                                                                 | 默认值      |
| --------- | ----------------------------------------- | ------------------------------------------------------------------------------------ | ----------- |
| `as`      | 渲染为的元素或组件（Reka UI `Primitive`） | `AsTag \| Component`                                                                 | `'span'`    |
| `asChild` | 合并到子元素上渲染（Reka UI composition） | `boolean`                                                                            | —           |
| `icon`    | 图标名称或 Iconify 图标数据               | `IconifyIconProps['icon']`                                                           | —           |
| `color`   | 色彩                                      | `'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'`               | `'neutral'` |
| `variant` | 外观变体                                  | `'solid' \| 'soft' \| 'elevated' \| 'outline' \| 'frame' \| 'inverse' \| 'unstyled'` | `'solid'`   |
| `size`    | 尺寸                                      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                               | `'md'`      |
| `radius`  | 圆角                                      | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                           | `'md'`      |
| `class`   | 根节点额外 class                          | `any`                                                                                | —           |
| `ui`      | 覆盖 slots 样式（`root` / `icon`）        | `Partial<IconTileStyleSlots>`                                                        | —           |

## Slots

| 插槽      | 说明                                              |
| --------- | ------------------------------------------------- |
| `default` | 自定义内容；未提供且传入 `icon` 时渲染内置 `Icon` |

## Accessibility

根节点固定 `aria-hidden="true"`，作为装饰性视觉标记。若图标表达独立含义，请在相邻元素提供等效文本，或改用可访问的自定义内容。
