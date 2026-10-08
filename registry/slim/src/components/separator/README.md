# Separator

用于在内容之间创建视觉与语义分隔的分隔线组件，支持标签与多种外观。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/separator
```

## Usage

## Props

| 属性            | 说明                                         | 类型                                                        | 默认值         |
| --------------- | -------------------------------------------- | ----------------------------------------------------------- | -------------- |
| `as`            | 渲染为的元素或组件（Reka UI `Primitive`）    | `AsTag \| Component`                                        | `'div'`        |
| `asChild`       | 合并到子元素上渲染（Reka UI composition）    | `boolean`                                                   | —              |
| `orientation`   | 方向                                         | `'horizontal' \| 'vertical'`                                | `'horizontal'` |
| `decorative`    | 是否为纯装饰；为 `true` 时从无障碍树中移除   | `boolean`                                                   | —              |
| `color`         | 颜色                                         | `'base' \| 'elevated' \| 'inverted'`                        | `'base'`       |
| `variant`       | 外观变体                                     | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'gradient'` | `'solid'`      |
| `label`         | 分隔线上的标签文案                           | `string`                                                    | —              |
| `labelPosition` | 标签位置；未传 `label` 时按 `none` 处理      | `'none' \| 'start' \| 'center' \| 'end'`                    | `'center'`     |
| `class`         | 根节点额外 class                             | `any`                                                       | —              |
| `ui`            | 覆盖 slots 样式（`root` / `label` / `line`） | `Partial<SeparatorStyleSlots>`                              | —              |

## Accessibility

遵循 WAI-ARIA Separator 设计模式。基于 Reka UI `Separator`：默认 `role="separator"`；`decorative` 为 `true` 时设为 `role="none"` 并从无障碍树移除。垂直方向且非装饰时设置 `aria-orientation="vertical"`。
