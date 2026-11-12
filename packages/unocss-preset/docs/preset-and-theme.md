# 配置 Preset 与定制主题

`presetWemeUI(options)` 的每个字段都会改变选择器、变量前缀或主题块。这一页按字段说明写什么、生成什么，以及默认主题在什么条件下被追加进去。

主题对象的形状是 `CustomTheme`：`name`、`radius`、`scaling`、`aliases`、`tokens`、`cssVars`。仓库里的 `defineTheme` 会用默认主题补齐缺省字段，但 `src/index.ts` 没有把它再导出。从 `@weme-ui/unocss-preset` 只能拿到 `presetWemeUI` 和 `PresetWemeUIOptions`。调用方要自己写完整对象，或在本仓库源码里调用 `defineTheme`。

## 使用场景

- 暗色要跟系统 `prefers-color-scheme`，或要改成 `.light` / `.dark` 以外的类名。
- 和现有 CSS 抢优先级，需要 `!important` 或 `#app` 前缀。
- 做一个叫 `brand` 的主题，换强调色、圆角和缩放，而不是改默认的 `puerto` / `iron`。
- 给色板加一个主题里没有的颜色名，例如 `zinc`。

## 选项一览

| 字段 | 不传时 | 作用 |
| --- | --- | --- |
| `dark` | `'class'` | `'class'` 或 `{ light, dark }` 时，`dark:` / `light:` 变成祖先类；`'media'` 时变成 `prefers-color-scheme` |
| `variablePrefix` | `'un-'` | 不是 `'un-'` 时，后处理把 `--un-` 换成这个前缀 |
| `prefix` | 不设置 | 原样交给 preset 的 `prefix` |
| `reset` | 未赋值，只有 `false` 才关闭 | 控制是否输出 reset |
| `important` | `false` | `true` 给声明加 `!important`；字符串则包一层该选择器 |
| `arbitraryVariants` | `true` | 为 `true` 时使用 `extractorArbitraryVariants` |
| `transformerVariantGroup` | `true` | 为 `true` 时挂上变体组 transformer |
| `themes` | `[]`，随后可能追加默认主题 | 每个主题一块 `[data-theme]` CSS |
| `colors` | `{}` | `accent` / `neutral` 两张表，用来增加颜色 |
| `cssVars` | `{}` | 写到 `:root` 的自定义变量 |

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      dark: 'class',
      variablePrefix: 'un-',
      reset: true,
      important: false,
    }),
  ],
}
```

Sources: `packages/unocss/src/index.ts`, `packages/unocss/src/theme/default.ts`, `packages/unocss/src/preflights/reset.ts`

## 暗色模式

`'class'` 时，`dark:` 的前缀是 `.dark`，`light:` 的前缀是 `.light`。对象形式可以改类名，缺省仍是 `.light` 和 `.dark`。

```ts
presetWemeUI({
  dark: {
    light: '.theme-light',
    dark: '.theme-dark',
  },
})
```

```html
<body class="theme-dark">
  <p class="text-highlighted light:text-subtle">这段字在暗色容器里用高亮色。</p>
</body>
```

`dark: 'media'` 时，`dark:` / `light:` 不再要求页面上的类，而是：

```css
@media (prefers-color-scheme: dark) { /* dark: 工具类 */ }
@media (prefers-color-scheme: light) { /* light: 工具类 */ }
```

无论 `dark` 怎么设，另外一组变体始终存在：`.dark:`、`.light:`、`@dark:`、`@light:`、`not-dark:`。`.dark:` 固定匹配类名 `.dark`。`@dark:` 固定是 `prefers-color-scheme: dark`。色板变量本身仍写在 `.dark` 规则里，见 Preflights 那一页。

Sources: `packages/unocss/src/index.ts`, `packages/unocss/src/variants/dark.ts`, `packages/unocss/src/preflights/theme.ts`

## 默认主题什么时候出现

```ts
if (options.themes?.length === 0 || options.themes?.some((t) => t.name === 'default')) {
  options.themes.push(DEFAULT_THEME)
}
```

三种结果：

- 不传 `themes`，或传 `[]`：数组里只有内置 `default`（`radius: 'md'`，`scaling: '100%'`，`accent: 'puerto'`，`neutral: 'iron'`）。
- 只传 `name` 不是 `'default'` 的主题：不会再追加内置主题。页面必须带上对应的 `data-theme`。
- 自己放了一个 `name: 'default'`：你的对象在前，内置 `DEFAULT_THEME` 在后。同选择器上后写的变量覆盖先写的。想替换内置默认主题时，不要用这个名字。

`name === 'default'` 的选择器是 `:root,:where([data-theme="default"])`。其他名字只有 `:where([data-theme="名称"])`，不会自动落到 `:root`。

仓库内可以用 `defineTheme` 补默认值。它不在包入口上。

```ts
import { defineTheme } from './custom/theme'

const brand = defineTheme({
  name: 'brand',
  radius: 'lg',
  scaling: '110%',
  aliases: {
    accent: 'indigo',
    neutral: 'slate',
  },
  tokens: {
    foreground: {
      highlighted: 'accent.12',
      base: 'neutral.12',
    },
  },
  cssVars: {
    panel: {
      background: 'neutral.2',
      border: 'accent.6',
    },
  },
})
```

`defineTheme` 用 `defu` 把没写的 `aliases`、`tokens`、`cssVars` 和默认主题合并。只改 `accent` 时，`neutral`、`success`、`info`、`warning`、`error` 仍是 `iron`、`green`、`indigo`、`brown`、`tomato`。

从已发布的包调用时，写成完整对象：

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      themes: [
        {
          name: 'brand',
          radius: 'lg',
          scaling: '110%',
          aliases: {
            accent: 'indigo',
            neutral: 'slate',
            success: 'green',
            info: 'indigo',
            warning: 'brown',
            error: 'tomato',
          },
          tokens: {
            foreground: {
              highlighted: 'accent.12',
              base: 'neutral.12',
              subtle: 'neutral.9',
              muted: 'neutral.7',
              inverted: 'neutral.1',
            },
            background: {
              base: 'neutral.1',
              muted: 'neutral.3',
              elevated: 'neutral.4',
              inverted: 'neutral.12',
            },
            border: {
              base: 'neutral.5',
              elevated: 'neutral.6',
              inverted: 'neutral.12',
            },
          },
          cssVars: {
            panel: {
              background: 'neutral.2',
              border: 'accent.6',
            },
          },
        },
      ],
    }),
  ],
}
```

```html
<body data-theme="brand" data-radius="lg" data-scaling="110%">
  <section class="bg-panel text-highlighted border border-panel rounded-lg p-lg">
    品牌主题下的面板
  </section>
</body>
```

组合示例，基于源码导出构造。生成结果里，品牌主题块包含：

```css
:where([data-theme="brand"]) {
  --default-radius-factor: 1.5;
  --default-scaling: 1.1;
  --accent-9: var(--custom-accent-9, var(--indigo-9));
  --panel-bg: var(--neutral-2);
  --panel-border: var(--accent-6);
}
```

`radius: 'lg'` 来自 `themeRadiusMap` 的 `1.5`，`scaling: '110%'` 来自 `1.1`。`bg-panel` 用 `--panel-bg`，`border-panel` 用 `--panel-border`。

Sources: `packages/unocss/src/index.ts`, `packages/unocss/src/custom/theme.ts`, `packages/unocss/src/custom/default.ts`, `packages/unocss/src/custom/types.ts`, `packages/unocss/src/custom/mappings.ts`, `packages/unocss/src/preflights/custom.ts`

## 额外颜色

`colors.accent` 与 `colors.neutral` 会和内置的 `clay`、`moroccan`、`puerto`、`iron`、`covert` 一起做成 12 阶色。测试里的写法：

```ts
presetWemeUI({
  colors: {
    accent: {
      zinc: 'oklch(27.9% 0.041 260.031)',
    },
    neutral: {
      mist: 'oklch(96% 0.002 260)',
    },
  },
})
```

```html
<div class="bg-zinc-9 text-mist-12 border border-zinc-7">锌色底，雾色字</div>
```

`defu` 保留先写入的键。Radix 色和 `black` / `white` 先进入主题，同名的 `colors` 不会盖掉它们。新名字可以，`indigo` 这种已有名字不行。

Sources: `packages/unocss/src/theme/colors.ts`, `packages/unocss/src/index.ts`, `packages/unocss/test/theme/colors.test.ts`

## 圆角、缩放、字号和间距

主题上的 `radius` / `scaling` 写入 `--default-radius-factor` 和 `--default-scaling`。页面上的属性写入另一对变量，而且优先：

```css
[data-scaling='90%'] { --scaling: 0.9; }
[data-scaling='100%'] { --scaling: 1; }
[data-scaling='110%'] { --scaling: 1.1; }

[data-radius='none'] { --radius-factor: 0; }
[data-radius='md'] { --radius-factor: 1; }
[data-radius='lg'] { --radius-factor: 1.5; }
[data-radius='full'] { --radius-factor: 1.5; }
```

间距和圆角类读的是：

```css
--spacing: calc(0.25rem * var(--scaling, var(--default-scaling, 1)));
--radius-lg: calc(0.5rem * var(--scaling, var(--default-scaling, 1)) * var(--radius-factor, var(--default-radius-factor, 1)));
```

所以 `data-radius` / `data-scaling` 会立刻影响 `p-4`、`gap-md`、`rounded-lg`。属性没写时才落到主题配置的默认系数。

字号键是 `xs`、`sm`、`base`、`lg`、`xl`、`2xl` 直到 `9xl`。间距键是 `xs`、`sm`、`md`、`lg`、`xl`、`2xl` 直到 `9xl`。断点是 `mobile` 520px、`tablet` 768px、`laptop` 1024px、`desktop` 1280px、`wide` 1640px。

```html
<main data-scaling="95%" data-radius="sm" class="font-sans text-base p-lg rounded-md">
  <h1 class="text-3xl fw-semibold tracking-tight">设置页</h1>
</main>
```

Sources: `packages/unocss/src/preflights/preflight.ts`, `packages/unocss/src/theme/misc.ts`, `packages/unocss/src/theme/font.ts`, `packages/unocss/src/theme/size.ts`, `packages/unocss/src/custom/mappings.ts`

## 注意事项

- `name: 'default'` 不会替换内置主题，内置块写在后面。换一套默认外观时用别的 `name`，并在根节点写 `data-theme`。
- `themeRadiusMap` 里 `full` 是 `'3'`，preflight 里 `[data-radius='full']` 是 `1.5`。属性存在时 `--radius-factor: 1.5` 胜出，主题选项里的 `radius: 'full'` 只影响 `--default-radius-factor`。
- `colors` 不能覆盖已经存在的 Radix 色名。
- `defineTheme` 只存在于 `src/custom/theme.ts`。发布包的入口没有这个函数。
- `reset` 的注释写着默认 `true`，函数体只判断 `=== false`。不传和传 `true` 都会输出 reset。没有单独的开关可以关掉 base 层里的 `color-scheme`、`data-scaling`、`data-radius`。

## 相关页面

- 安装 preset 并写出第一个类名
- 使用 Radix Colors 刻度与别名
- 使用并覆盖自定义 CSS 变量
- 理解 Preflights 与 Postprocess
