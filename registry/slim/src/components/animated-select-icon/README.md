# Animated Select Icon

在选中 / 未选中态之间切换图标，并用 Motion 做淡入缩放过渡。基于 `Icon` 与 `motion-v`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/animated-select-icon
```

## Usage

## Props

| 属性           | 说明                                             | 类型                       | 默认值 |
| -------------- | ------------------------------------------------ | -------------------------- | ------ |
| `icon`         | 未选中态图标（Iconify）；必填                    | `IconifyIconProps['icon']` | —      |
| `selectedIcon` | 选中态图标（Iconify）；未传时选中态回退到 `icon` | `IconifyIconProps['icon']` | —      |
| `selected`     | 是否为选中态；切换时触发进出场动画               | `boolean`                  | —      |
| `class`        | 根节点额外 class                                 | `any`                      | —      |

其余未列出的属性经 `$attrs` 透传至 `Motion`（`inheritAttrs: false`）。

## Accessibility

装饰性选中态图标容器，根节点设置 `data-slot="animated-select-icon"`、`data-selected`（由 `selected` 映射）。不含独立键盘交互；若图标表达独立含义，请在相邻元素提供等效文本，或为图标设置可访问名称。
