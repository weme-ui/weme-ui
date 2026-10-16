# Empty

空状态展示组件。基于 Reka UI `Primitive`，通过 `IconTile` 展示图标，并提供标题、描述与底部内容插槽，适合列表、搜索无结果等场景。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/empty
```

## Usage

## Props

| 属性          | 说明                                                                                        | 类型                                        | 默认值 |
| ------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| `as`          | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                             | `AsTag \| Component`                        | —      |
| `asChild`     | 是否合并到子元素（Reka UI `Primitive`）                                                     | `boolean`                                   | —      |
| `size`        | 尺寸；同时映射默认 `IconTile` 尺寸（`sm`→`xs`，`md`→`sm`，`lg`→`md`）                       | `'sm' \| 'md' \| 'lg'`                      | `'md'` |
| `icon`        | 图标；字符串为 Iconify 名，或传入 `IconTile` 的 props；默认强制 `variant="soft"` 与映射尺寸 | `IconifyIconProps['icon'] \| IconTileProps` | —      |
| `title`       | 标题文案；无 `title` 插槽时作为默认内容                                                     | `string`                                    | —      |
| `description` | 描述文案；无 `description` 插槽时作为默认内容                                               | `string`                                    | —      |
| `unstyled`    | 移除样式变体类，仅保留结构                                                                  | `boolean`                                   | —      |
| `class`       | 根节点额外 class                                                                            | `any`                                       | —      |
| `ui`          | 覆盖 slots 样式（`root` / `header` / `media` / `title` 等）                                 | `Partial<EmptyStyleSlots>`                  | —      |

## Slots

| 插槽          | 说明                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `header`      | 自定义整块头部（含 media / title / description）；未传时渲染默认头部结构                                                    |
| `media`       | 自定义媒体区；未传且提供 `icon` 时渲染 `IconTile`（`variant="soft"`，尺寸随 Empty `size` 映射）；无插槽且无 `icon` 时不渲染 |
| `title`       | 标题内容；未传时回退到 `title` prop；无插槽且无 prop 时不渲染                                                               |
| `description` | 描述内容；未传时回退到 `description` prop；无插槽且无 prop 时不渲染                                                         |
| `content`     | 底部内容（如操作按钮）；未提供该插槽时不渲染容器                                                                            |

## Accessibility

根节点设置 `data-slot="empty"`。标题与描述可通过 props 或插槽提供可读文本；默认图标经由 `IconTile` 渲染，若图标仅作装饰，请确保相邻文案已表达状态含义。
