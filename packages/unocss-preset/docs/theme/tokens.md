# Tokens

Tokens 层把「色板」映射成「产品语义」：颜色别名（`primary`）、前景/背景/边框语义色，以及可自定义的组件级 CssVars。它们由 `custom` preflight 写入 `[data-theme='…']`，再由颜色 / 间距类规则消费。

## Anatomy

未传 `themes` 时自动注入：

```ts
/**
 * 默认主题名称
 *
 * @category Tokens
 */
export const DEFAULT_NAME = 'default'

/**
 * 默认主题颜色
 *
 * @category Tokens
 */
export const DEFAULT_COLOR_ALIASES: CustomThemeColorAlias = {
  primary: 'gunmetal',
  secondary: 'clay',
  neutral: 'iron',
  success: 'green',
  info: 'blue',
  warning: 'orange',
  error: 'red',
}

/**
 * 默认主题令牌
 *
 * @category Tokens
 */
export const DEFAULT_TOKENS: CustomThemeTokens = {
  foreground: {
    highlighted: 'neutral.12',
    base: 'neutral.11',
    subtle: 'neutral.6',
    muted: 'neutral.4',
    inverted: 'neutral.1',
  },
  background: {
    base: 'neutral.1',
    muted: 'neutral.2',
    elevated: 'neutral.3',
    inverted: 'neutral.12',
  },
  border: {
    base: 'neutral.5',
    elevated: 'neutral.6',
    inverted: 'neutral.12',
  },
}
```

选择器：

- 默认主题：`:root, :where([data-theme='default'])`
- 暗色：`.dark:where([data-theme='default'])`
- 其它主题：`:where([data-theme='name'])` / `.dark:where([data-theme='name'])`

## Color aliases

| 别名        | 默认指向   |
| ----------- | ---------- |
| `primary`   | `gunmetal` |
| `secondary` | `clay`     |
| `neutral`   | `iron`     |
| `success`   | `green`    |
| `info`      | `blue`     |
| `warning`   | `orange`   |
| `error`     | `red`      |

生成的 CSS（按需，仅跟踪到的刻度）：

```css
:where([data-theme='default']) {
  --primary-9: var(--custom-primary-9, var(--gunmetal-9));
}

.dark:where([data-theme='default']) {
  --primary-9: var(--custom-primary-9, var(--gunmetal-9));
}
```

- 别名值为色名时：映射到对应 `--{color}-{n}`
- 别名值为 raw 颜色（`#hex` / `oklch(...)` / `var(...)` 等）时：现场生成 12 阶 P3 刻度作为回退
- 可用 `--custom-{alias}-{n}` 覆盖单阶

```html
<button class="bg-primary text-white hover:bg-primary-10">Save</button>
<span class="text-error-11">Error</span>
```

未写刻度时默认补 **9**：`bg-primary` ≡ `bg-primary-9`。

## Semantic tokens

| Token                      | 默认值                             |
| -------------------------- | ---------------------------------- |
| `--foreground-highlighted` | `neutral.12` → `var(--neutral-12)` |
| `--foreground-base`        | `neutral.11`                       |
| `--foreground-subtle`      | `neutral.6`                        |
| `--foreground-muted`       | `neutral.4`                        |
| `--foreground-inverted`    | `neutral.1`                        |
| `--background-base`        | `neutral.1`                        |
| `--background-muted`       | `neutral.2`                        |
| `--background-elevated`    | `neutral.3`                        |
| `--background-inverted`    | `neutral.12`                       |
| `--border-base`            | `neutral.5`                        |
| `--border-elevated`        | `neutral.6`                        |
| `--border-inverted`        | `neutral.12`                       |

```html
<section class="bg-background-base text-foreground-base border border-border-base">
  <p class="text-foreground-subtle">Muted copy</p>
</section>
```

匹配形式：

- `text-foreground-base` / `bg-background-muted` / `border-border-elevated`
- 必须写完整 `{group}-{variant}`（如 `foreground-base`），不会单独匹配裸的 `base` / `highlighted`
- 透明度：`bg-background-base/50`

Token 键集合固定为：

```ts
foreground: highlighted | base | subtle | muted | inverted
background: base | muted | elevated | inverted
border: base | elevated | inverted
```

## CssVars

两处可声明：

1. **全局** `options.cssVars` → 写到 `:root`
2. **主题内** `themes[].cssVars` → 写到对应 `[data-theme]`

嵌套对象会 flatten：`{ card: { bg: '…', padding: '…' } }` → `--card-bg`、`--card-padding`。

值可以是：

- 色板引用：`neutral.2` → `var(--neutral-2)`（并跟踪颜色依赖）
- 别名引用：`primary.9` → `var(--primary-9)`
- 任意 CSS 值：`1rem`、`#fff`、`var(--x)`

```ts
presetWemeUI({
  cssVars: {
    card: {
      background: 'neutral.2',
      text: 'neutral.12',
      border: 'neutral.6',
      padding: '1rem',
      width: '20rem',
    },
  },
  themes: [
    {
      name: 'default',
      colors: { primary: 'blue' },
      tokens: {
        /* 可覆盖 DEFAULT_TOKENS */
      },
      cssVars: {
        button: { bg: 'primary.9', color: 'white' },
      },
    },
  ],
})
```

## Fuzzy map

当工具类写 `bg-card`、`text-card`、`p-card` 时，会按 CSS 属性在已声明的扁平 CssVars 里找 `{name}-{suffix}`，**后缀按优先级从左到右**取第一个命中：

| CSS 属性           | 可匹配 suffix（优先 → 次要）                                           | 示例                                                           |
| ------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| `color`            | `text` > `color`                                                       | `text-card` → `--card-text` 或 `--card-color`                  |
| `background-color` | `background` > `bg` > `color`                                          | `bg-card` → `--card-background` / `--card-bg` / `--card-color` |
| `border-color`     | `border-color` > `border`                                              | `border-card` → `--card-border-color` / `--card-border`        |
| `fill`             | `fill` > `background` > `bg` > `color`                                 | `fill-card`                                                    |
| `border-width`     | `border-width`                                                         | `border-width-card`（尺寸类解析）                              |
| `width`            | `width` > `w` > `size` > `max-width` > `max-w` > `min-width` > `min-w` | `w-card`                                                       |
| `height`           | `height` > `h` > `size` > …                                            | `h-card`                                                       |
| `padding`          | `padding` > `p` > `space`                                              | `p-card`                                                       |
| `margin`           | `margin` > `m` > `space`                                               | `m-card`                                                       |

```html
<article class="bg-card text-card border-card p-card w-card rounded-md">Card content</article>
```

```css
:root {
  --card-background: var(--neutral-2);
  --card-text: var(--neutral-12);
  --card-border: var(--neutral-6);
  --card-padding: 1rem;
  --card-width: 20rem;
}
```

尺寸类（`p-*` / `m-*` / `w-*` / `h-*` / `border-*` 宽度）走 `parseCustomThemeSize`；颜色类走 `customThemeColorResolver`，并支持 `/透明度`。

## 自定义主题示例

```ts
presetWemeUI({
  themes: [
    {
      name: 'marketing',
      colors: {
        primary: 'amber',
        secondary: 'sky',
        neutral: 'slate',
        success: 'green',
        info: 'blue',
        warning: 'orange',
        error: 'red',
      },
      tokens: {
        foreground: {
          highlighted: 'neutral.12',
          base: 'neutral.11',
          subtle: 'neutral.8',
          muted: 'neutral.6',
          inverted: 'neutral.1',
        },
        background: {
          base: 'neutral.1',
          muted: 'neutral.2',
          elevated: 'neutral.3',
          inverted: 'neutral.12',
        },
        border: {
          base: 'neutral.6',
          elevated: 'neutral.7',
          inverted: 'neutral.12',
        },
      },
      cssVars: {
        hero: { bg: 'primary.3', text: 'primary.12' },
      },
    },
  ],
})
```

```html
<body data-theme="marketing" class="bg-background-base text-foreground-base">
  <section class="bg-hero text-hero p-8">Hero</section>
</body>
```

## 解析顺序小结

颜色工具类（如 `text-*` / `bg-*` / `border-*` / `fill-*`）大致顺序：

1. Theme 色板 / 任意颜色值
2. Color Alias（`primary` … `error`）
3. 语义 Token（`foreground-*` / `background-*` / `border-*`）
4. CssVars 模糊匹配

未匹配则该规则不产出样式（交给后续规则或忽略）。
