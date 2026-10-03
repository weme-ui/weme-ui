# Spacing

间距刻度与缩放选项概览。

## Space scale

全部带 `var(--scaling)`，数字类间距 `p-4` 使用基线 `--spacing`：

| 键               | 值                               |
| ---------------- | -------------------------------- |
| `DEFAULT` / `xs` | `calc(0.25rem * var(--scaling))` |
| `sm`             | `calc(0.5rem * var(--scaling))`  |
| `md`             | `calc(0.75rem * var(--scaling))` |
| `lg`             | `calc(1rem * var(--scaling))`    |
| `xl`             | `calc(1.5rem * var(--scaling))`  |
| `2xl`            | `calc(2rem * var(--scaling))`    |
| `3xl`            | `calc(2.5rem * var(--scaling))`  |
| `4xl`            | `calc(3rem * var(--scaling))`    |
| `5xl`            | `calc(4rem * var(--scaling))`    |

```html
<div class="p-4 m-md gap-sm">...</div>
```

```text
p-4  -> padding: calc(var(--spacing) * 4)
m-md -> margin: calc(0.75rem * var(--scaling))
```

### Space scale tokens

```css
:root,
:host {
  --spacing: calc(0.25rem * var(--scaling));
}
```

## Scaling

影响布局的值（间距、字号相关尺度等）会相对 `data-scaling` 统一缩放，便于整站调节 UI 密度。

| 属性                    | 值 → CSS 变量     |
| ----------------------- | ----------------- |
| `[data-scaling='90%']`  | `--scaling: 0.9`  |
| `[data-scaling='95%']`  | `--scaling: 0.95` |
| `[data-scaling='100%']` | `--scaling: 1`    |
| `[data-scaling='105%']` | `--scaling: 1.05` |
| `[data-scaling='110%']` | `--scaling: 1.1`  |

### Scaling factor

缩放因子可通过 `--scaling` 访问；自定义样式中复用该变量即可与主题保持一致。

```css
.MyCustomComponent {
  width: calc(200px * var(--scaling));
}
```
