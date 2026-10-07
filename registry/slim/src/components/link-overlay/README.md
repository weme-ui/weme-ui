# Link Overlay

通过 `::before` 伪元素将链接点击区域扩展到定位祖先，适合让整张卡片或区块可点击，同时保持语义化的 `<a>`。

父级容器需设置 `position: relative`（如 `class="relative"`），否则覆盖层无法铺满目标区域。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/link-overlay
```

## Usage

## Props

| 属性      | 说明                                      | 类型                 | 默认值 |
| --------- | ----------------------------------------- | -------------------- | ------ |
| `as`      | 渲染为的元素或组件（Reka UI `Primitive`） | `AsTag \| Component` | `'a'`  |
| `asChild` | 合并到子元素上渲染（Reka UI composition） | `boolean`            | —      |
| `class`   | 根节点额外 class                          | `any`                | —      |

其余未列出的属性（如 `href`、`target`、`rel`）经 `$attrs` 透传到根节点。

## Slots

| 插槽      | 说明                       |
| --------- | -------------------------- |
| `default` | 链接内容（通常为标题文案） |

## Accessibility

默认渲染为原生 `<a>`（Reka UI `Primitive`）。点击区域由 `::before` 伪元素扩展到最近的定位祖先，链接本身仍保留在文档流中，便于读屏与键盘导航。

### Keyboard Interactions

| Key     | Description    |
| ------- | -------------- |
| `Enter` | 激活链接并导航 |
