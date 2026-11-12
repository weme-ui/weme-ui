# 在仓库里新增规则、变量与变体

使用这个包时，能扩展的是 `presetWemeUI` 的 `themes`、`colors`、`cssVars`，以及应用自己的 UnoCSS 配置。仓库里新增一种工具类、一个变体或一条 shortcut，要改对应目录再挂进已经存在的数组。包入口没有 `defineRule`、`defineVariant`、`defineShortcut`。

`src/index.ts` 对包外只导出 `presetWemeUI`、默认导出和 `PresetWemeUIOptions`。`defineTheme` 在 `src/custom/theme.ts`，给仓库内的调用补默认字段。

## 使用场景

- 应用要加一个品牌色或一套 `data-theme`，但不改预设源码。
- 贡献者要加一条本包还没有的工具类，并让它和现有主题变量、按需输出走同一套跟踪。
- 贡献者要加一个变体前缀，并放进 `variants()` 的顺序里。

## 不改源码就能做的扩展

颜色名走 `colors.accent` 或 `colors.neutral`。主题走 `themes` 数组，名字不要用 `default`，否则内置主题会再追加在后面并盖住同名变量。变量走 preset 的 `cssVars`，或某个主题对象的 `cssVars`。

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      colors: {
        accent: { zinc: 'oklch(27.9% 0.041 260.031)' },
      },
      themes: [
        {
          name: 'brand',
          radius: 'lg',
          scaling: '100%',
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
            badge: { background: 'accent.4', color: 'accent.11' },
          },
        },
      ],
    }),
  ],
}
```

```html
<body data-theme="brand">
  <span class="bg-badge text-badge rounded-md px-sm py-xs text-sm">Indigo 徽章</span>
  <span class="bg-zinc-3 text-zinc-11">额外的 zinc 阶</span>
</body>
```

`bg-badge` 读 `--badge-bg`，`text-badge` 读 `--badge`（`color` 被短键丢掉）。`zinc` 是一整套 12 阶，类名写 `bg-zinc-3`。

应用配置里还可以并列放 UnoCSS 自己的 `rules`、`shortcuts`、`variants`。那些数组不属于本包，本包也不会读取它们。本包返回的 `rules` 只来自 `src/rules/default.ts`。

Sources: `packages/unocss/src/index.ts`, `packages/unocss/src/theme/colors.ts`, `packages/unocss/src/custom/types.ts`, `packages/unocss/src/custom/theme.ts`

## 新增一条规则

1. 在 `src/rules/` 加文件，或写进已有的规则文件。
2. 从该文件导出规则数组。
3. 在 `src/rules/index.ts` 再导出。
4. 把数组放进 `src/rules/default.ts` 的 `rules`。越靠后越晚匹配；`questionMark` 必须留在最后。

颜色类要走 `colorResolver`，这样别名、token、自定义变量和按需色板才会跟上。引用主题值时调用 `themeTracking`，否则 `theme` preflight 不会输出对应变量。

`underline-accent` 已经由 `src/rules/decoration.ts` 生成 `text-decoration-color`。不要再注册一条相同前缀。下面用本包目前没有的 `marker-` 作示意，它现在匹配不到，挂进 `rules` 之前不能当可用类名。

```ts
import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'
import { colorResolver } from '../utils'

export const markers: Rule<Theme>[] = [
  [/^marker-(.+)$/, colorResolver('color', 'marker')],
]
```

把 `markers` 放进 `rules` 数组、`questionMark` 之前。若前面已有规则先匹配到同一个类名，后面的规则不会再执行。

只在开发环境出现的调试类，沿用 `questionMark` 的做法：读取 `generator.userConfig.envMode === 'dev'`，其他模式不返回声明。

Sources: `packages/unocss/src/rules/default.ts`, `packages/unocss/src/rules/index.ts`, `packages/unocss/src/rules/decoration.ts`, `packages/unocss/src/rules/question-mark.ts`, `packages/unocss/src/utils/track.ts`, `packages/unocss/src/utils/utilities.ts`

## 新增一个变体

变体集中在 `variants(options)`。新变体应能读到 `PresetWemeUIOptions`，这样暗色类名、前缀才和配置一致。文件放在 `src/variants/`，从 `src/variants/index.ts` 导出，再加进 `variants()` 的返回数组。

顺序会影响谁先改写 matcher。断点、暗色、`important` 已经占据前面的位置。新的状态变体放在伪类附近，避免抢在 `variantNegative`（前导 `-`）之前。

```ts
import type { VariantObject } from '@unocss/core'
import type { Theme } from '../theme'

export const variantOpen: VariantObject<Theme> = {
  name: 'open',
  match(matcher) {
    if (!matcher.startsWith('open:')) return
    return {
      matcher: matcher.slice(5),
      selector: (selector) => `${selector}[open]`,
    }
  },
}
```

这是贡献示意，不是当前可用类名。现成的打开状态请写 `data-[open]:` 或 `[&[open]]:p-2`。

变体若依赖主题表，表要在 `theme()` 里赋值。`data` 变体已经会读 `theme.data`，但 `theme()` 没有提供这张表，所以默认只能用方括号。要支持 `data-open:` 这种名字，需要在 `src/theme/default.ts` 的返回值里加上 `data`，并在 `Theme` 类型里保留该字段。类型上已经有 `data?: Record<string, string>`，实现侧没有填。

Sources: `packages/unocss/src/variants/default.ts`, `packages/unocss/src/variants/index.ts`, `packages/unocss/src/variants/data.ts`, `packages/unocss/src/theme/default.ts`, `packages/unocss/src/theme/types.ts`

## 新增 shortcut 或 preflight

shortcut 只有 `src/shortcuts/index.ts` 一处拼接：`containerShortcuts` 和 `utilitiesShortcuts`。新的静态映射追加进这个数组。展开的目标必须是已经能匹配的工具类，例如 `items-center`，不要指向不存在的类。

preflight 在 `preflights()` 里按层追加。新的全局变量放进 `theme` 层时，和 `custom`、`theme` 用同一层，避免盖住 `base` 里的 reset。需要随类名出现的变量继续用 `themeTracking`，不要在 preflight 里无条件打印整张色板。

`configResolved` 会清空 `trackedTheme`、`trackedProperties`、`trackedCSSVars`、`trackedColorAliases`。新增跟踪集合时要在这里一起清掉，否则热更新后会残留上一轮的变量。

组合示例，基于源码导出构造。应用侧主题加一条 badge 变量，贡献侧不必再写新规则，`bg-` / `text-` 已经能读自定义变量：

```html
<span class="inline-flex items-center rounded-md bg-badge px-sm py-xs text-sm text-badge fw-medium">
  新主题变量，旧的背景和文字规则
</span>
```

若 badge 还要一个本包没有的属性，再按上一节加规则，并让规则读取 `var(--badge)` 或 `colorResolver`。

Sources: `packages/unocss/src/shortcuts/index.ts`, `packages/unocss/src/preflights/index.ts`, `packages/unocss/src/index.ts`, `packages/unocss/src/utils/track.ts`

## 注意事项

- 不要从 `@weme-ui/unocss-preset` 导入 `defineTheme`、`rules`、`variants`。入口没有这些导出。
- `name: 'default'` 的自定义主题不会替换内置主题。
- `colors` 不能覆盖同名 Radix 色。新颜色用新名字。
- 新规则若比已有规则更靠后，会被先匹配的正则吃掉。`underline-accent` 已经是文字装饰颜色，`ring-`、`text-` 也已经有规则。
- 新变体的类名在文档写出来之前，先用生成器确认选择器。未挂进 `variants()` 的函数不会生效。
- `questionMark` 保持在 `rules` 数组最后。

## 相关页面

- 配置 Preset 与定制主题
- 使用并覆盖自定义 CSS 变量
- 按场景选用 Rules 类名
- 用 Variants 写暗色、断点与状态
- 理解 Preflights 与 Postprocess
