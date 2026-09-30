# Colors

Weme 的颜色体系以 [Radix Colors](https://www.radix-ui.com/colors) 为基础，每色提供 **1–12** 阶刻度，并同时输出 **OKLCH**（默认）与 **Display P3** 两套值，亮色 / 暗色分开存放。

## Quick reference

### 内置色板

**Radix 主色 / 中性色：**

`gray`、`mauve`、`slate`、`sage`、`olive`、`sand`、`gold`、`bronze`、`brown`、`yellow`、`amber`、`orange`、`tomato`、`red`、`ruby`、`crimson`、`pink`、`plum`、`purple`、`violet`、`iris`、`indigo`、`blue`、`cyan`、`teal`、`jade`、`green`、`grass`、`lime`、`mint`、`sky`

**额外 accent：**

| 名称       | 源色      |
| ---------- | --------- |
| `clay`     | `#d97757` |
| `ocean`    | `#05f`    |
| `gunmetal` | `#1d2129` |

**额外 neutral：**

| 名称   | 源色      |
| ------ | --------- |
| `iron` | `#86909c` |

另有 `black` / `white`（走 Radix A 系列刻度）。

### 工具类写法

- `bg-blue-9` → `background-color: var(--blue-9)`
- `text-red-11` → `color: var(--red-11)`
- `border-amber-6` → `border-color: var(--amber-6)`
- `text-blue-9/50` → `color-mix` 50% 透明
- `bg-primary` → `var(--primary-9)`（语义别名，未写刻度时默认 **9**）
- `text-primary-11` → `var(--primary-11)`
- `bg-transparent` / `text-current` / `text-inherit`

特殊值：`transparent`、`current`（→ `currentColor`）、`inherit`；也支持 `#hex`、`[rgb(...)]`、`$cssvar`、任意 bracket 颜色。

### Preflight 输出结构

```css
/* layer: theme */
:root,
.light {
  --amber-1: oklch(...);
}

.dark {
  --amber-1: oklch(...);
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root,
    .light {
      --amber-1: color(display-p3...);
    }

    .dark {
      --amber-1: color(display-p3...);
    }
  }
}
```

默认 `preflights.theme` 为 `'on-demand'`：只生成当前构建实际用到的颜色变量；设为 `true` 则全量输出。

## 刻度语义（Radix 约定）

| 阶    | 用途               |
| ----- | ------------------ |
| 1–2   | 应用背景           |
| 3–5   | 组件背景 / 悬停    |
| 6–8   | 边框               |
| 9–10  | 实心控件（按钮等） |
| 11–12 | 文本               |

按钮实心色常用 `*-9`，hover 常用 `*-10`，正文常用 `*-11` / `*-12`。

## 自定义颜色

通过 `colors.accent` / `colors.neutral` 传入单色 hex，会自动生成完整 12 阶（含亮暗与 P3）：

```ts
presetWemeUI({
  colors: {
    accent: { brand: '#3366ff' },
    neutral: { stone: '#78716c' },
  },
})
```

```html
<div class="bg-brand-9 text-stone-11">...</div>
```

自定义色会基于 OKLCH 混合到最近的 Radix 色阶；accent 对 8–11 阶有额外对比度处理。

## 颜色解析优先级

工具类解析颜色时大致按以下路径：

1. Theme 色板键：`blue-9`、`red-12`
2. 语义别名：`primary`、`error-9`（见 [Tokens](./tokens.md)）
3. 语义 Tokens：`foreground-base`、`background-muted`
4. CssVars 模糊匹配：`card` → `--card-bg` / `--card-color` 等
5. 任意值：`[#fff]`、`[oklch(...)]`、`$my-var`

透明度用 `/N`（0–100 整数），会生成 `color-mix`，并在支持时优先 `oklab`：

```html
<div class="bg-blue-9/10 text-foreground-base/80">...</div>
```

```css
.bg-blue-9\/10 {
  background-color: color-mix(in srgb, var(--blue-9) var(--un-bg-opacity), transparent);
}
@supports (color: color-mix(in lab, red, red)) {
  .bg-blue-9\/10 {
    background-color: color-mix(in oklab, var(--blue-9) var(--un-bg-opacity), transparent);
  }
}
```

## 与 Theme / Tokens 的关系

- **Theme `colors`**：原始色板 `--blue-9`、`--iron-1`（由 color preflight 写入）
- **Tokens 别名**：`--primary-9` → `var(--custom-primary-9, var(--gunmetal-9))`（由 custom theme preflight 写入）
- **语义 Tokens**：`--foreground-base` → `var(--neutral-11)` 等

亮暗切换、`dark:` Variants 与 `.dark` 覆盖见 [Dark Mode](./dark-mode.md)。

详见 [Theme](./theme.md) 与 [Tokens & CssVars](./tokens.md)。
