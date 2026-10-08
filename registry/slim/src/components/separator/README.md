# Separator

用于在内容之间创建视觉与语义分隔的分隔线组件，支持标签与多种外观。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/separator
```

## Usage

## Props

| 属性            | 说明                                                              | 类型                                                        | 默认值         |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- | -------------- |
| `as`            | 渲染为的元素或组件（Reka UI `Primitive`）                         | `AsTag \| Component`                                        | `'div'`        |
| `orientation`   | 方向                                                              | `'horizontal' \| 'vertical'`                                | `'horizontal'` |
| `decorative`    | 是否为纯装饰；为 `true` 时从无障碍树中移除（仅无 `label` 时生效） | `boolean`                                                   | —              |
| `color`         | 颜色                                                              | `'base' \| 'elevated' \| 'inverted'`                        | `'base'`       |
| `variant`       | 外观变体                                                          | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'gradient'` | `'solid'`      |
| `label`         | 分隔线上的标签文案                                                | `string`                                                    | —              |
| `labelPosition` | 标签位置；未传 `label` 时按 `none` 处理                           | `'none' \| 'start' \| 'center' \| 'end'`                    | `'center'`     |
| `class`         | 根节点额外 class                                                  | `any`                                                       | —              |
| `ui`            | 覆盖 slots 样式（`root` / `label` / `line`）                      | `Partial<SeparatorStyleSlots>`                              | —              |

## Slots

| 插槽      | 说明                                                                    |
| --------- | ----------------------------------------------------------------------- |
| `default` | 自定义标签内容；仅在传入 `label` 时渲染，未提供插槽内容时回退到 `label` |

## Accessibility

遵循 WAI-ARIA Separator 设计模式。基于 Reka UI `Separator`。

无 `label` 时：默认 `role="separator"`；`decorative` 为 `true` 时设为 `role="none"` 并从无障碍树移除；垂直方向且非装饰时设置 `aria-orientation="vertical"`。

有 `label` 时：根节点 `role="separator"`，标签节点设置 `aria-label`；两侧线条强制为 `decorative`（`role="none"`）。
