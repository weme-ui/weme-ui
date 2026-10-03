# Radius

圆角刻度与 `data-radius` 调节选项。

## Radius scale

全部带 `var(--scaling) * var(--radius-factor)`（`none` 除外）：

| 键        | 值                                                      |
| --------- | ------------------------------------------------------- |
| `DEFAULT` | `calc(0.25rem * var(--scaling) * var(--radius-factor))` |
| `none`    | `0`                                                     |
| `xs`      | `calc(0.125rem * …)`                                    |
| `sm`      | `calc(0.25rem * …)`                                     |
| `md`      | `calc(0.375rem * …)`                                    |
| `lg`      | `calc(0.5rem * …)`                                      |
| `xl`      | `calc(0.75rem * …)`                                     |
| `2xl`     | `calc(1rem * …)`                                        |

```html
<div class="rounded-md">...</div>
```

## Radius factor

Reset preflight 根据 `data-radius` 写入全局圆角因子：

| 属性                   | 值 → CSS 变量           |
| ---------------------- | ----------------------- |
| `[data-radius='none']` | `--radius-factor: 0`    |
| `[data-radius='xs']`   | `--radius-factor: 0.5`  |
| `[data-radius='sm']`   | `--radius-factor: 0.75` |
| `[data-radius='md']`   | `--radius-factor: 1`    |
| `[data-radius='lg']`   | `--radius-factor: 1.5`  |
| `[data-radius='full']` | `--radius-factor: 1.5`  |

```html
<html data-radius="md">
  …
</html>
```
