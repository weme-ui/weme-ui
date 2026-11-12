# 使用 Radix Colors 刻度与别名

颜色类读的是主题里的 12 阶色，不是写死的十六进制。省略阶数时用第 9 阶。亮色值在 `:root`，暗色值在 `.dark`，支持 P3 的屏幕再覆盖一层 `color(display-p3 …)`。别名 `accent`、`neutral`、`info`、`success`、`warning`、`error` 再指到这些具体色上。

## 使用场景

- 按 Radix 的 1–12 阶画背景、分割线、正文和实心按钮。
- 组件只写 `bg-accent`、`text-error`，换主题时改别名，不改类名。
- 给一个不在 Radix 名单里的品牌色做一整套 12 阶。

## 有哪些名字

Radix 中性色：`gray`、`mauve`、`slate`、`sage`、`olive`、`sand`。

Radix 强调色：`tomato`、`red`、`ruby`、`crimson`、`pink`、`plum`、`purple`、`violet`、`iris`、`indigo`、`blue`、`cyan`、`sky`、`teal`、`jade`、`green`、`mint`、`grass`、`lime`、`bronze`、`gold`、`brown`、`orange`、`amber`、`yellow`。

额外中性色：`iron`（`#53595d`）、`covert`（`#13151a`）。额外强调色：`clay`（`#d97757`）、`moroccan`（`#065aed`）、`puerto`（`#3fc1aa`）。

另外还有 `black`、`white`，以及 `black-auto`、`white-auto`。

默认别名：

| 别名 | 指向 |
| --- | --- |
| `accent` | `puerto` |
| `neutral` | `iron` |
| `success` | `green` |
| `info` | `indigo` |
| `warning` | `brown` |
| `error` | `tomato` |

Sources: `packages/colors/src/constants.ts`, `packages/unocss/src/theme/colors.ts`, `packages/unocss/src/custom/default.ts`

## 刻度怎么写

每个颜色有 `'1'` 到 `'12'`，以及 `dark` 和 `p3` / `p3.dark`。类名只写名字和阶数，暗色与 P3 由 preflight 写进变量。

```html
<div class="bg-indigo-2 text-indigo-11 border border-indigo-6">
  <h2 class="text-indigo-12 fw-semibold">Indigo 信息块</h2>
  <p class="text-indigo-11">2 阶做底，11 阶做正文，6 阶做边。</p>
</div>
```

不写阶数等于第 9 阶：

```html
<button class="bg-indigo text-white-auto">主按钮</button>
<button class="bg-indigo-9 text-white-auto">和上一颗相同的底色</button>
```

`bg-indigo` 与 `bg-indigo-9` 都是 `background-color: var(--indigo-9)`。`bg-white-auto` 是 `var(--white-auto-9)`。`bg-black` 是 `var(--black-9)`，亮暗两套刻度相同，但第 9 阶不是纯黑。

透明度写在 `/` 后面，生成 `color-mix`。支持 `color-mix(in lab, red, red)` 时再补一条 `in oklab`：

```html
<div class="bg-indigo/80 text-indigo-12">80% 的 indigo 第 9 阶</div>
```

```css
.bg-indigo\/80 {
  background-color: color-mix(in srgb, var(--indigo-9) 80%, transparent);
}
@supports (color: color-mix(in lab, red, red)) {
  .bg-indigo\/80 {
    background-color: color-mix(in oklab, var(--indigo-9) 80%, transparent);
  }
}
```

同一套阶数也可以用在文字、边框和光标色：`text-jade-11`、`c-jade-11`、`color-jade-11`、`border-jade-7`、`b-jade-7`、`caret-jade-11`、`accent-jade`。

Sources: `packages/unocss/src/theme/types.ts`, `packages/unocss/src/theme/colors.ts`, `packages/unocss/src/utils/utilities.ts`, `packages/unocss/src/rules/color.ts`, `packages/unocss/src/rules/typography.ts`, `packages/unocss/src/rules/border.ts`, `packages/unocss/test/preset.test.ts`

## 暗色和 P3

用到的阶数才会输出。`bg-indigo` 只带动 `--indigo-9`，不会把 1–12 全部打进 CSS。别名同理：只用 `bg-accent-3` 时，主题块里出现 `--accent-3`，不会出现没用到的 `--accent-1`。

```css
:root {
  --indigo-9: oklch(54.4% 0.1912 267.1);
}
.dark {
  --indigo-9: oklch(54.4% 0.1912 267.1);
}
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root { --indigo-9: color(display-p3 0.276 0.384 0.837); }
    .dark { --indigo-9: color(display-p3 0.276 0.384 0.837); }
  }
}
```

因此祖先带上 `class="dark"` 后，`bg-indigo` 自动读暗色值。`dark:bg-slate-1` 则是在暗色下改用另一条类。

```html
<section class="bg-slate-1 text-slate-12 dark:bg-slate-1">
  <p class="text-slate-11">底色类不用重复写 dark:，变量自己会换。</p>
  <span class="bg-amber-9 text-amber-12 dark:bg-amber-4 dark:text-amber-11">仅暗色改用 4 阶底</span>
</section>
```

P3 查询包在 `@supports (color: color(display-p3 1 1 1))` 和 `@media (color-gamut: p3)` 里。不支持的环境继续用 oklch。

Sources: `packages/unocss/src/preflights/theme.ts`, `packages/unocss/src/preflights/custom.ts`, `packages/unocss/src/variants/dark.ts`

## 别名

`bg-accent` 先解析成 `var(--accent-9)`。主题块再把别名接到具体色：

```css
:root,
:where([data-theme="default"]) {
  --accent-9: var(--custom-accent-9, var(--puerto-9));
  --neutral-1: var(--custom-neutral-1, var(--iron-1));
}
```

默认主题下，`bg-accent` → `--accent-9` → `--puerto-9`。`text-neutral-11` → `--neutral-11` → `--iron-11`。

六个别名都可以带阶数：

```html
<p class="bg-success-3 text-success-11 border border-success-7">保存成功</p>
<p class="bg-warning-3 text-warning-11">库存不足</p>
<p class="bg-error-3 text-error-11">无法连接</p>
<p class="bg-info-3 text-info-11">只读模式</p>
```

别名的值如果是 `#`、`rgb(`、`hsl(`、`lab(`、`lch(`、`oklch(`、`color(` 或 `var(` 开头，主题块会写成该颜色算出的 P3 刻度，而不是 `var(--名字-阶)`。普通颜色名则写成 `var(--custom-别名-阶, var(--颜色名-阶))`。

组合示例，基于源码导出构造：

```html
<div class="dark">
  <button class="bg-accent text-inverted rounded-md px-lg py-sm hover:bg-accent-10">
    发布
  </button>
  <button class="bg-neutral-3 text-neutral-12 border border-neutral-7 ml-sm">
    存草稿
  </button>
  <span class="text-error-11 ml-md">标题不能为空</span>
</div>
```

暗色容器里，`bg-accent` 仍是第 9 阶，但 `--puerto-9` 换成 `.dark` 里的值。悬停用第 10 阶。错误文字用 `error` 别名的第 11 阶，默认落到 `tomato`。

Sources: `packages/unocss/src/custom/utilities.ts`, `packages/unocss/src/custom/default.ts`, `packages/unocss/src/preflights/custom.ts`, `packages/unocss/test/preset.test.ts`

## 自己加一个颜色

`colors.accent` 走强调色算法，`colors.neutral` 走中性色算法。同一种源色，两种算法的 12 阶不一样。

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      colors: {
        accent: { zinc: 'oklch(27.9% 0.041 260.031)' },
      },
    }),
  ],
}
```

```html
<span class="bg-zinc-3 text-zinc-11 border-l border-zinc-8 pl-sm">自定义 zinc</span>
```

Sources: `packages/unocss/src/theme/colors.ts`, `packages/unocss/test/theme/colors.test.ts`

## 注意事项

- 只用到的阶数会输出。安全列表或实际类名里没有的阶，CSS 里不会有对应变量。
- `bg-black` / `bg-white` 是 12 阶里的默认第 9 阶。要带透明的黑白用 `black-auto`、`white-auto`。
- 别名变量形如 `--accent-9: var(--custom-accent-9, var(--puerto-9))`。换色优先写 `--custom-accent-9`，或换一个不是 `default` 的主题。细节在 CSS 变量那一页。
- 把已有 Radix 名字再放进 `colors` 不会覆盖原色。
- `text-sm` 不是颜色。颜色阶是数字，`text-indigo-11` 才是颜色，`text-sm` 是字号。

## 相关页面

- 配置 Preset 与定制主题
- 使用并覆盖自定义 CSS 变量
- 按场景选用 Rules 类名
- 理解 Preflights 与 Postprocess
