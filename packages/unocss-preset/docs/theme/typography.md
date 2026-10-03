# Typography

字族、字重、字号与字距等排版令牌。

## Font family

默认使用系统字体栈，便于移植与可读性。

| 键      | 说明                    |
| ------- | ----------------------- |
| `sans`  | 系统 UI 无衬线栈        |
| `serif` | Times 系                |
| `mono`  | Menlo / Consolas 等宽栈 |

```html
<p class="font-sans">...</p>
<code class="font-mono">...</code>
```

## Font weight

| 键         | 值  |
| ---------- | --- |
| `light`    | 300 |
| `regular`  | 400 |
| `medium`   | 500 |
| `semibold` | 600 |
| `bold`     | 700 |

```html
<span class="fw-medium font-bold">...</span>
```

## Type scale

**text：**

| 键     | fontSize    | lineHeight | letterSpacing |
| ------ | ----------- | ---------- | ------------- |
| `xs`   | `0.75rem`   | `1rem`     | `0.0025em`    |
| `sm`   | `0.875rem`  | `1.25rem`  | —             |
| `base` | `1rem`      | `1.5rem`   | —             |
| `lg`   | `1.125rem`  | `1.625rem` | `-0.0025em`   |
| `xl`   | `1.25rem`   | `1.75rem`  | `-0.005em`    |
| `2xl`  | `1.5rem`    | `1.875rem` | `-0.00625em`  |
| `3xl`  | `1.75rem`   | `2.25rem`  | `-0.0075em`   |
| `4xl`  | `2.1875rem` | `2.5rem`   | `-0.01em`     |
| `5xl`  | `3.75rem`   | `1`        | `-0.025em`    |

```html
<p class="text-sm">...</p>
<h1 class="text-2xl">...</h1>
```

## Leading / Tracking

**leading：** `none` 1、`tight` 1.25、`snug` 1.375、`normal` 1.5、`relaxed` 1.625、`loose` 2

**tracking：** `tighter` -0.05em … `widest` 0.1em

```html
<p class="leading-tight tracking-wide">...</p>
```

## Text stroke

**textStrokeWidth：** `DEFAULT` 1.5rem、`none` 0、`sm` thin、`md` medium、`lg` thick

```html
<span class="text-stroke text-stroke-sm">...</span>
```
