# 按场景选用 Rules 类名

`rules` 是一组按顺序匹配的工具类。先命中的规则生效。这一页不罗列每一个文件，只按界面上会写到的类名说明：排版、间距、尺寸、颜色、边框、阴影、布局、过渡。颜色阶和 token 的细节在另外两页，这里关注类名怎么和它们拼在一起。

`src/rules/index.ts` 负责再导出各文件，真正排进 preset 的数组在 `src/rules/default.ts`。`questionMark` 放在最后，只在 `envMode === 'dev'` 时让 `?` 和 `where` 产生闪动描边，用来看元素有没有被样式命中。

## 使用场景

- 写卡片、按钮、表单时需要字号、间距、圆角、边框和阴影的真实类名。
- 不确定 `text-sm` 和 `text-muted` 哪个是字号、哪个是颜色。
- 焦点环只写了 `ring-accent`，结果看不到环。

## 排版

字号键来自 `theme.text`：`xs`、`sm`、`base`、`lg`、`xl`、`2xl` 到 `9xl`。字重键来自 `theme.fontWeight`：`thin`、`extralight`、`light`、`normal`、`medium`、`semibold`、`bold`、`extrabold`、`black`。字体家族是 `font-sans`、`font-serif`、`font-mono`。行高键是 `none`、`tight`、`snug`、`normal`、`relaxed`、`loose`，类名可以写 `leading-`、`lh-` 或 `line-height-`。字距键是 `tighter`、`tight`、`normal`、`wide`、`wider`、`widest`。

```html
<article class="font-sans text-base leading-relaxed text-default">
  <h1 class="text-4xl fw-semibold tracking-tight text-highlighted">发布说明</h1>
  <p class="text-lg text-subtle">14 到 18 像素这一档用 sm 和 lg，不写死像素。</p>
  <p class="font-mono text-sm text-muted">build 0.3.2</p>
</article>
```

`text-4xl` 写出 `--text-4xl-fontSize`、`--text-4xl-lineHeight`，有字距的阶还会写 `--text-4xl-letterSpacing`。`fw-medium` 是 `font-weight: var(--fontWeight-medium)`，变量名保留主题键 `fontWeight`，中间没有再改成 `font-weight`。`font-medium` 同样走字重，因为 `medium` 不在 `font` 家族表里、在字重表里。

颜色和字号都是 `text-` 开头，靠主题里有没有这个字号键区分：

```html
<p class="text-sm text-indigo-11">sm 是字号，indigo-11 是颜色</p>
<p class="text-base text-muted">base 是字号，muted 是语义色</p>
<p class="c-success-11 color-error">c- 与 color- 只表示颜色</p>
```

对齐用 `text-left`、`text-center`、`text-right`、`text-justify`、`text-start`、`text-end`，也可以写成 `text-align-start`。

Sources: `packages/unocss/src/rules/typography.ts`, `packages/unocss/src/rules/align.ts`, `packages/unocss/src/theme/font.ts`

## 间距、尺寸、圆角

数字类乘 `--spacing`：`p-4` 是 `calc(var(--spacing) * 4)`。命名键走独立变量：`p-lg`、`gap-md`、`m-xl`。方向字母是 `x`、`y`、`t`、`r`、`b`、`l`、`s`、`e`，以及 `block`、`inline`。

```html
<section class="p-lg px-xl pt-sm mb-md gap-sm">
  <div class="w-full max-w-prose h-screen-tablet">宽度不超过 prose，高度至少到 tablet 断点的视口。</div>
</section>
```

`w-full`、`h-screen`、`w-fit`、`h-min`、`max-w-md` 来自尺寸规则。`max-w-md` 会先查 `container.md`（`28rem`），再查间距。`w-screen-tablet` 取断点宽度 `768px`。`size-16` 同时写宽高。`aspect-video` 是 `16/9`，`aspect-square` 是 `1/1`。

圆角类是 `rounded` 或 `rd`，可加方向和主题键：`rounded-lg`、`rd-md`、`rounded-t-xl`、`rounded-none`。主题键有 `none`、`xs`、`sm`、`md`、`lg`、`xl`、`2xl`、`3xl`、`4xl`。不写键的 `rounded` 用 `radius.DEFAULT`。`full` 不在这张表里，规则单独把它写成 `calc(infinity * 1px)`。

```html
<img class="size-16 aspect-square rounded-full object-cover" alt="" />
<div class="w-md rounded-t-lg rounded-b-sm"></div>
```

Sources: `packages/unocss/src/rules/spacing.ts`, `packages/unocss/src/rules/size.ts`, `packages/unocss/src/rules/border.ts`, `packages/unocss/src/theme/misc.ts`, `packages/unocss/src/theme/size.ts`

## 颜色、边框、阴影和环

`border` 与 `b` 把边框宽度设为 `1px`，不带颜色。颜色要再写 `border-default`、`b-elevated`、`border-indigo-7`。

```html
<div class="border border-default bg-elevated shadow-md rounded-lg p-lg">
  <div class="border-b border-b-default pb-sm">底边单独用语义边框色</div>
</div>
```

`border` 是四边 `border-width: 1px`。`border-b` 只留下底边宽度。`border-b-default` 是 `border-bottom-color: var(--border)`。不要写 `b-muted` 或 `border-b-muted`：它们会生成 `--border-muted`、`--border-bottom-muted`，默认 token 里没有这两个变量。语义边框色只用 `default`、`elevated`、`inverted`，或者直接写颜色阶 `border-indigo-7`。

阴影键是 `2xs`、`xs`、`sm`、`md`、`lg`、`xl`、`none`、`inner`。不写键的 `shadow` 用 `DEFAULT`。`inset-shadow-sm` 读 `insetShadow`。

环的宽度和颜色是两条规则，写在同一个文件里，宽度在前：

```html
<button class="ring ring-accent ring-offset">有 1px 环，颜色是 accent 第 9 阶</button>
<button class="ring-2 ring-error focus:ring-accent">2px 环，焦点时改颜色</button>
<button class="ring-accent">只有 --un-ring-color，没有 box-shadow</button>
```

`ring` 和 `ring-2` 写出 `box-shadow`，颜色回退是 `currentColor`。`ring-accent` 只设置 `--un-ring-color`。只写颜色类看不到环。`ring-offset` 默认偏移 `1px`。

渐变色用 `from-`、`via-`、`to-`：

```html
<div class="from-accent to-neutral-3">停止色分别写到 --un-gradient-from 和 --un-gradient-to</div>
```

这两条类只设置渐变停止色变量。背景图层是否拉成一条渐变，还要再写背景规则里能产生 `background-image` 的类。只写 `from-accent to-neutral-3` 不会自动出现可见渐变。

Sources: `packages/unocss/src/rules/border.ts`, `packages/unocss/src/rules/shadow.ts`, `packages/unocss/src/rules/ring.ts`, `packages/unocss/src/rules/background.ts`, `packages/unocss/src/rules/color.ts`

## 布局、显示和过渡

```html
<div class="flex flex-col gap-md tablet:flex-row tablet:items-center tablet:justify-between">
  <div class="flex-1 min-w-0">
    <h2 class="truncate text-highlighted">可以缩进的标题</h2>
  </div>
  <div class="flex flex-center gap-sm">
    <span class="inline-flex items-center">状态</span>
  </div>
</div>
```

常用静态类：`flex`、`inline-flex`、`flex-1`、`flex-col`、`flex-row`、`flex-wrap`、`grid`、`inline-grid`、`block`、`inline-block`、`hidden`、`items-center`、`justify-between`、`relative`、`absolute`、`fixed`、`sticky`、`truncate`。`z-10` 这种数字直接成为 `z-index`。`truncate` 同时写 `overflow: hidden`、`text-overflow: ellipsis`、`white-space: nowrap`。`top` / `right` / `bottom` / `left` 只接受数字、分数或带单位的值，例如 `bottom-4`、`left-1/2`。`bottom-lg` 不会去查间距表里的 `lg`。

过渡属性键在 `theme.property`：`none`、`all`、`colors`、`opacity`、`shadow`、`transform`，以及由它们合成的 `DEFAULT`。

```html
<button class="bg-accent text-inverted transition-colors duration-200 ease-out hover:bg-accent-10 motion-reduce:transition-none">
  颜色过渡
</button>
<span class="animate-pulse text-muted">处理中</span>
```

`transition` 不带后缀时使用 `property.DEFAULT`、150ms 和默认缓动。`transition-colors` 只过渡颜色相关属性。`animate-pulse`、`animate-spin`、`animate-ping` 使用 `theme.animation.keyframes` 里的同名关键帧。`animate-none` 把 `animation` 设为 `none`。缓动类是 `animate-ease-in`、`animate-ease-out`、`animate-ease-in-out`，键来自 `theme.ease`。

`duration-200` 是否等于 200ms，取决于时间解析而不是一张名为 duration 的主题表。`theme()` 没有单独的 `duration` 字段。`animate-duration-*` 在没有 `theme.duration` 时走时间值解析。

组合示例，基于源码导出构造：

```html
<article class="relative flex flex-col gap-md bg-elevated text-default border border-elevated shadow-sm rounded-lg p-lg tablet:flex-row tablet:items-center">
  <div class="size-12 rounded-md bg-accent-4 flex items-center justify-center text-accent-11 fw-semibold">12</div>
  <div class="flex-1">
    <h3 class="text-lg text-highlighted">每周同步</h3>
    <p class="text-sm text-subtle leading-snug">平板以上横排，颜色用 accent 的 4 阶和 11 阶。</p>
  </div>
  <button class="ring ring-accent bg-accent text-inverted rounded-md px-lg py-sm transition-colors hover:bg-accent-10">
    立即同步
  </button>
</article>
```

Sources: `packages/unocss/src/rules/flex.ts`, `packages/unocss/src/rules/grid.ts`, `packages/unocss/src/rules/static.ts`, `packages/unocss/src/rules/position.ts`, `packages/unocss/src/rules/transition.ts`, `packages/unocss/src/rules/animation.ts`, `packages/unocss/src/theme/transition.ts`, `packages/unocss/src/theme/animate.ts`

## 显示、光标和透明度

`hidden` 是 `display: none`。`cursor-pointer`、`cursor-not-allowed` 来自光标表。透明度可以写 `op-50`、`op50`、`opacity-100`。`scheme-dark` 与 `color-scheme-dark` 设置 `color-scheme`。

```html
<button class="cursor-pointer op-100 aria-disabled:op-50 aria-disabled:cursor-not-allowed">
  可点击
</button>
```

`aria-disabled:op-50` 生成 `[aria-disabled="true"]` 上的 `opacity: 50%`。

Sources: `packages/unocss/src/rules/static.ts`, `packages/unocss/src/rules/color.ts`, `packages/unocss/src/rules/behaviors.ts`

## 注意事项

- `text-sm` 是字号，`text-muted` 是颜色，`text-base` 也是字号。语义色没有叫做 `base` 的类，对应类名是 `text-default`。
- `border` 只给 1px 宽度。颜色是 `border-default` 或 `border-indigo-7`。
- `ring-accent` 不产生阴影。要和 `ring` 或 `ring-2` 一起写。
- `from-accent to-neutral-3` 只写入渐变变量。
- `rounded-full` 不读 `theme.radius`，固定是 `calc(infinity * 1px)`。`data-radius="full"` 影响的是 `--radius-factor`，不会把 `rounded-lg` 变成全圆。
- `top-lg`、`bottom-lg` 不会命中。边缘偏移用 `top-4`、`bottom-8` 这种数字，或 `top-1/2`。命名间距键用在 `p-lg`、`m-lg`、`gap-lg`。
- `gapRules` 在 `rules` 数组注释里标成实验规则，类名前缀是 `rule-`。稳定布局先用 `gap-`。
- 开发环境的 `?` 与 `where` 会给元素加动画描边，生产环境的 `envMode` 不是 `dev` 时这条规则不输出。

## 相关页面

- 使用 Radix Colors 刻度与别名
- 使用并覆盖自定义 CSS 变量
- 用 Variants 写暗色、断点与状态
- 用 Shortcuts 收拢重复类名
