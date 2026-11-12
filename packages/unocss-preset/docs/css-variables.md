# CSS 变量

语义颜色和你自己声明的变量，最后都变成 `--变量名`，再被 `bg-*`、`text-*`、`border-*`、`w-*` 读走。类名和变量名经常不一致：`base`、`default`、`color` 会被短键丢掉，`background` 变成 `bg`，`foreground` 变成 `text`。

这一页说明默认 token 写成什么类、`cssVars` 写在哪一层，以及怎样覆盖 `--accent-*`。

## 使用场景

- 页面只想写 `bg-muted`、`text-highlighted`、`border`，不关心背后是 `iron` 的第几阶。
- 给卡片、侧栏声明一组自己的变量，让 `bg-card`、`w-card` 读到它们。
- 不换主题名字，只把强调色从 `puerto` 改成某一阶 `indigo`。

## 默认 token

内置 token 在进入 CSS 之前会按短键改名：

| 配置里的键 | 实际变量 | 对应类名 |
| --- | --- | --- |
| `foreground.highlighted` = `neutral.12` | `--text-highlighted` | `text-highlighted` |
| `foreground.base` = `neutral.11` | `--text` | `text-default` |
| `foreground.subtle` = `neutral.9` | `--text-subtle` | `text-subtle` |
| `foreground.muted` = `neutral.7` | `--text-muted` | `text-muted` |
| `foreground.inverted` = `neutral.1` | `--text-inverted` | `text-inverted` |
| `background.base` = `neutral.1` | `--bg` | `bg-default` |
| `background.muted` = `neutral.3` | `--bg-muted` | `bg-muted` |
| `background.elevated` = `neutral.4` | `--bg-elevated` | `bg-elevated` |
| `background.inverted` = `neutral.12` | `--bg-inverted` | `bg-inverted` |
| `border.base` = `neutral.5` | `--border` | `border-default`、`b-default` |
| `border.elevated` = `neutral.6` | `--border-elevated` | `border-elevated`、`b-elevated` |
| `border.inverted` = `neutral.12` | `--border-inverted` | `border-inverted`、`b-inverted` |

`neutral.12` 这种值会先变成颜色变量 `var(--neutral-12)`，再由别名指到 `--iron-12`。

```html
<article class="bg-default text-default border border-default rounded-md">
  <h2 class="text-highlighted">标题用 12 阶中性色</h2>
  <p class="text-subtle">次要说明用 9 阶。</p>
  <p class="text-muted">辅助信息用 7 阶。</p>
  <span class="bg-inverted text-inverted px-sm">反色标签</span>
</article>
```

把背景色拿去当文字色、把文字色拿去当背景色，测试里这些类是成立的：

```html
<p class="text-bg-muted">文字色读 --bg-muted</p>
<p class="bg-text text-inverted">背景色读 --text</p>
<div class="bg-border">背景色读 --border</div>
```

`text-default` 的声明是 `color: var(--text)`，不是 `var(--text-default)`。`bg-default` 是 `background-color: var(--bg)`。`border-default` 是 `border-color: var(--border)`。

## 自己的 cssVars

`presetWemeUI({ cssVars })` 写到 `:root`。某个主题的 `cssVars` 写到该主题的选择器。值有三种结果：

- 能解析成主题色，例如 `neutral.3`：变成 `var(--neutral-3)`，并带上那一阶颜色。
- 尺寸或原始颜色，例如 `100px`、`#000`、`oklch(...)`、`var(--已有)`：原样写入。
- 其他字符串：变成 `var(--把点换成横线)`。

短键在写变量时就生效。下面这组字段：

```ts
presetWemeUI({
  cssVars: {
    card: {
      background: 'neutral.1',
      muted: 'neutral.3',
      border: 'neutral.6',
      color: 'neutral.12',
      width: '20rem',
    },
  },
})
```

得到：

```css
:root {
  --card-bg: var(--neutral-1);
  --card-muted: var(--neutral-3);
  --card-border: var(--neutral-6);
  --card: var(--neutral-12);
  --card-width: 20rem;
}
```

`background` 变成 `bg`，`color` 被丢掉，所以颜色落在 `--card` 上，而不是 `--card-color`。

类名按属性去匹配后缀：

```html
<article class="bg-card text-card border border-card w-card p-lg rounded-lg">
  <p class="bg-card-muted text-card">卡片里的次级条</p>
</article>
```

生成结果：

```css
.bg-card { background-color: var(--card-bg); }
.text-card { color: var(--card); }
.border-card { border-color: var(--card-border); }
.w-card { width: var(--card-width); }
.bg-card-muted { background-color: var(--card-muted); }
```

`bg` 优先找 `bg`，再找 `color`。`text` 优先找 `text`，再找 `color`。这里没有 `card-text`，文字就用 `--card`。宽度找 `width`，所以是 `--card-width`。`size-card` 会同时找宽和高的 `size` 后缀；只声明了 `width` 时，宽能对上，高不一定有自己的变量。

测试里同一套名字还可以用在这些前缀上：`c-`、`color-`、`b-`、`ring-`、`outline-`、`shadow-`、`fill-`、`stroke-`、`accent-`、`caret-`、`decoration-`、`underline-`、`divide-`、`drop-shadow-`、`drop-shadow-color-`、`rule-`、`inset-ring-`、`placeholder-`、`from-`、`to-`、`via-`、`mask-linear-from-`、`h-`、`size-`。

```html
<svg class="fill-card stroke-card"></svg>
<input class="caret-card placeholder-card" placeholder="卡片色的占位" />
<div class="from-card to-card-muted"></div>
```

## 短键撞在一起

`cssVarShortKeysMap` 把 `color`、`base`、`default` 收成空字符串，再从键里删掉。同一对象里这三项会挤成一个变量，先出现的留下。

```ts
cssVars: {
  test: {
    background: '#000',
    base: '#000',
    default: '#f00',
    color: '#fff',
    border: '#000',
    muted: 'neutral.3',
  },
}
```

`background` 单独变成 `--test-bg: #000`。随后 `base` 变成 `--test: #000`。`default` 和 `color` 也想占用 `--test`，被丢掉，`#f00` 和 `#fff` 不会出现。`muted` 仍是 `--test-muted: var(--neutral-3)`。

只声明 `background`、不声明 `color` / `base` 时，`text-page` 仍可能生成 `color: var(--page)`，而 CSS 里只有 `--page-bg`。文字类会匹配成功，变量却是空的。需要文字色时，显式写 `color` 或 `base`。

## 覆盖别名和主题变量

别名的形式固定为：

```css
--accent-9: var(--custom-accent-9, var(--puerto-9));
```

只要 `--custom-accent-9` 有值，就不再用 `puerto`。全局 `cssVars` 的原始 `var(...)` 会原样写出。

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      cssVars: {
        'custom-accent-9': 'var(--indigo-9)',
        'custom-accent-3': 'var(--indigo-3)',
        page: {
          background: '#f7f7f5',
        },
      },
    }),
  ],
}
```

```html
<body class="bg-page text-default">
  <button class="bg-accent-3 text-accent">仍写 accent，实际读 indigo</button>
</body>
```

这只覆盖你写到类名里的那些阶。没用到的阶仍回退到 `puerto`。

主题级变量不要和全局变量混在一个选择器里。全局在 `:root`，主题在 `:where([data-theme="名称"])`。同名时，带 `data-theme` 的块只在该属性下生效；默认主题因为选择器含 `:root`，会作用到整份文档。

组合示例，基于源码导出构造：

```html
<html class="dark" data-theme="default" style="--custom-accent-9: var(--indigo-9)">
  <section class="bg-muted text-highlighted border border-elevated rounded-lg p-lg tablet:p-xl">
    <h2 class="text-accent">暗色里的强调标题</h2>
    <p class="text-subtle">正文仍走 neutral token，标题的第 9 阶改读 indigo。</p>
  </section>
</html>
```

`style` 只是提前放上 `--custom-accent-9`。同一件事也可以放进 `cssVars`，不必写在元素上。`bg-muted` 和 `text-highlighted` 继续用默认 token。`tablet:p-xl` 在 768px 以上改间距。

## 在类名里直接写变量

`rules/variables.ts` 提供缩写属性到 `var(--*)` 的写法，名字以 `$` 开头：

```html
<div class="fw-$card select-$card">字重和 user-select 都写成 var(--card)</div>
<p class="[color:var(--text-subtle)]">这条声明直接写成 color: var(--text-subtle)</p>
```

`fw` 对应 `font-weight`，`select` 对应 `user-select`，`ws` 对应 `white-space`。上面的 `--card` 如果来自颜色字段，内容是颜色，不适合当字重；这里只说明 `$` 类名会读已有变量，不会新建变量。方括号规则要求属性名是一段连续的名字，值里可以包含 `var(...)`。

## 注意事项

- 类名 `text-default` 对应变量 `--text`。覆盖时改 `--text`，改 `--text-default` 不会作用到这个类。
- `background` 与 `color` 不要假设都会保留。看短键表：一个变 `bg`，一个消失。
- 同一短键只保留先出现的值。`base`、`default`、`color` 不要同时拿来表示不同颜色。
- 全局 `cssVars` 会整表输出，不看你有没有用到类名。主题色阶相反，只有被引用的阶才输出。
- 主题 token 的值写成 `neutral.12` 这种「颜色.阶」。写成未知字符串时，会变成 `var(--未知字符串)`。

## 相关页面

- 主题
- 颜色
- Rules
- Preflights
