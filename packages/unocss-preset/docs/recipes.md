# 组合类名、变量与变体

前面各页的类名可以叠在同一个元素上。这一页给出四块可以直接改文案使用的界面，并标出必须成对出现的类。所有类名都来自本包已经导出的规则、shortcut、变体和默认 token。

组合示例，基于源码导出构造。

## 使用场景

- 要一块信息卡、一组表单、一个确认框和一条顶栏，而不是单类演示。
- 想确认暗色变量、`dark:` 工具类、断点和环的宽度分别写在哪。
- 复制代码之前先看每块下面的「必须一起写」。

## 信息卡

默认主题下，底用 `bg-elevated`（`--bg-elevated` → neutral 4 阶），字用 `text-highlighted` / `text-subtle`，强调条用 `accent` 的 4 阶和 11 阶。平板以上横排。

```html
<article class="flex flex-col gap-md rounded-lg border border-elevated bg-elevated p-lg text-default shadow-sm tablet:flex-row tablet:items-center">
  <div class="flex size-12 items-center justify-center rounded-md bg-accent-4 text-accent-11 fw-semibold">
    12
  </div>
  <div class="min-w-0 flex-1">
    <h3 class="truncate text-lg text-highlighted">每周同步</h3>
    <p class="text-sm leading-snug text-subtle">平板以上横排。色板随祖先的 dark 类切换，不必给每一阶再写 dark:。</p>
  </div>
  <button class="rounded-md bg-accent px-lg py-sm text-inverted transition-colors hover:bg-accent-10 dark:bg-accent-4 dark:text-accent-12">
    立即同步
  </button>
</article>
```

必须一起写：

- `border` 和 `border-elevated`。前者是 1px，后者才是颜色。
- 按钮若要在暗色下改阶，祖先要有 `class="dark"`，元素上再写 `dark:bg-accent-4`。只写 `dark:`、祖先没有 `.dark`，这条分支不生效。
- `truncate` 同时写 `overflow`、`text-overflow` 和 `white-space`。它不会自己把 flex 子项的宽度压到可以出现省略号。

Sources: `packages/unocss/src/custom/default.ts`, `packages/unocss/src/rules/border.ts`, `packages/unocss/src/rules/flex.ts`, `packages/unocss/src/variants/dark.ts`, `packages/unocss/src/theme/size.ts`

## 表单控件

焦点环要同时有宽度和颜色。占位符颜色用 `placeholder-` 加颜色名。禁用用属性配合 `aria-disabled:`，而不是只加 `is-disabled`。

```html
<form class="grid gap-md rounded-lg bg-default p-lg text-default">
  <label class="grid gap-xs">
    <span class="text-sm fw-medium text-highlighted">邮箱</span>
    <input
      class="rounded-md border border-default bg-muted px-md py-sm text-default caret-accent outline-none ring ring-accent placeholder-neutral-9 focus:bg-default"
      placeholder="you@example.com"
      type="email"
    />
  </label>
  <label class="grid gap-xs">
    <span class="text-sm fw-medium text-highlighted">备注</span>
    <textarea
      class="min-h-24 rounded-md border border-elevated bg-elevated px-md py-sm text-sm leading-relaxed"
      rows="4"
    ></textarea>
  </label>
  <div class="flex gap-sm">
    <button class="rounded-md bg-accent px-lg py-sm text-inverted fw-medium" type="submit">
      保存
    </button>
    <button
      class="rounded-md bg-neutral-3 px-lg py-sm text-neutral-12 aria-disabled:is-disabled"
      type="button"
      aria-disabled="true"
    >
      重置
    </button>
  </div>
  <p class="text-sm text-error-11">邮箱格式不正确</p>
</form>
```

`placeholder-neutral-9` 生成 `::placeholder { color: var(--neutral-9) }`。`ring ring-accent` 才有 1px 的 accent 环；只留 `ring-accent` 时只有颜色变量。`aria-disabled:is-disabled` 在属性为 `true` 时展开 `op-50 select-none pointer-events-none`。

`min-h-24` 是 `min-height: calc(var(--spacing) * 24)`。`min-h-lg` 也能命中，因为 `lg` 在间距表里，结果是 `var(--spacing-lg)`。两条都是尺寸规则，不是两套不同的高度系统。

Sources: `packages/unocss/src/rules/ring.ts`, `packages/unocss/src/rules/placeholder.ts`, `packages/unocss/src/shortcuts/utilities.ts`, `packages/unocss/src/variants/aria.ts`, `packages/unocss/src/rules/size.ts`

## 确认框

层叠用 shortcut：遮罩 `z-overlay`（`z-300`），对话框 `z-modal`（`z-400`），完成后的提示 `z-toast`（`z-500`）。居中 shortcut 自己不含定位。

```html
<div class="relative min-h-screen bg-muted">
  <div class="fixed inset-0 z-overlay bg-black/40"></div>

  <section class="fixed z-modal absolute-center w-full max-w-md rounded-lg bg-elevated p-xl text-default shadow-xl max-tablet:p-lg">
    <h2 class="text-xl text-highlighted">删除这 12 封邮件</h2>
    <p class="mt-sm text-subtle">删除后不能从这里恢复。</p>
    <div class="mt-lg flex flex-x-center gap-sm">
      <button class="rounded-md bg-neutral-3 px-lg py-sm text-neutral-12" type="button">取消</button>
      <button class="rounded-md bg-error px-lg py-sm text-inverted" type="button">删除</button>
    </div>
  </section>

  <p class="absolute-x-center fixed bottom-4 left-1/2 z-toast rounded-md bg-inverted px-lg py-sm text-inverted shadow-md">
    已删除
  </p>
</div>
```

必须一起写：

- 对话框：`fixed` 与 `absolute-center`。只有后者时，元素仍在文档流里做 50% 平移。
- `max-w-md` 来自 `theme.container.md`（`28rem`），不是 shortcut `container`。
- `bg-black/40` 混合的是 `black` 的第 9 阶。若要透明黑，改 `bg-black-auto`。
- 提示用 `bottom-4`。`bottom-lg` 没有对应规则。

Sources: `packages/unocss/src/shortcuts/utilities.ts`, `packages/unocss/src/rules/position.ts`, `packages/unocss/src/theme/size.ts`, `packages/unocss/src/theme/misc.ts`

## 响应式顶栏

窄屏把横向链接藏进 `max-tablet:hidden`，并留一个始终可见的按钮。容器宽度用 `@container` 与 `@md:`，它看的是父容器 `28rem`，不是视口的 `tablet` 768px。

```html
<html class="light" data-theme="default" data-radius="md" data-scaling="100%">
  <header class="z-raised border-b border-default bg-elevated">
    <div class="container flex items-center justify-between gap-md px-lg py-sm">
      <a class="text-highlighted fw-semibold" href="/">Weme</a>
      <nav class="hidden items-center gap-lg tablet:flex">
        <a class="text-subtle hover:text-highlighted" href="/inbox">收件箱</a>
        <a class="text-subtle hover:text-highlighted" href="/settings">设置</a>
      </nav>
      <button class="rounded-md bg-accent px-md py-sm text-sm text-inverted tablet:px-lg" type="button">
        菜单
      </button>
    </div>
  </header>

  <div class="@container px-lg">
    <div class="@md:flex @md:items-center @md:justify-between grid gap-sm py-lg">
      <h1 class="text-3xl text-highlighted">收件箱</h1>
      <p class="text-subtle">容器宽过 28rem 后，标题和说明并排。</p>
    </div>
  </div>
</html>
```

`container` 这个 shortcut 会在 `mobile`、`tablet`、`laptop`、`desktop`、`wide` 上设置最大宽度，默认不自动居中。横向内边距仍要自己写 `px-lg`。`hidden tablet:flex` 把导航只留给 768px 以上。

Sources: `packages/unocss/src/rules/container.ts`, `packages/unocss/src/variants/container.ts`, `packages/unocss/src/variants/breakpoints.ts`, `packages/unocss/src/theme/size.ts`, `packages/unocss/src/preflights/preflight.ts`

## 一起改主题时

换强调色不要改这四块 HTML。在配置里把别名指到别的 Radix 色，或覆盖 `--custom-accent-9`：

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      cssVars: {
        'custom-accent-9': 'var(--indigo-9)',
        'custom-accent-4': 'var(--indigo-4)',
        'custom-accent-10': 'var(--indigo-10)',
        'custom-accent-11': 'var(--indigo-11)',
        'custom-accent-12': 'var(--indigo-12)',
      },
    }),
  ],
}
```

类名继续写 `bg-accent`、`bg-accent-4`、`hover:bg-accent-10`。没写进 `cssVars` 的阶仍回退到 `puerto`。

Sources: `packages/unocss/src/index.ts`, `packages/unocss/src/preflights/custom.ts`, `packages/unocss/src/custom/default.ts`

## 注意事项

- 祖先 `.dark` 负责换色板。`dark:` 只负责换工具类。两件事先决条件不同。
- `ring` 与 `ring-accent` 成对。`border` 与 `border-default` 成对。`fixed` 与 `absolute-center` 成对。
- `tablet:` 是视口，`@md:` 是容器宽度 `28rem`。
- `container` shortcut 不读取 `theme.container`，也不默认水平居中。
- 变体组括号不要写进这些片段。当前 transformer 不会把 `hover:(text-highlighted bg-muted)` 展开。

## 相关页面

- 安装 preset 并写出第一个类名
- 使用并覆盖自定义 CSS 变量
- 按场景选用 Rules 类名
- 用 Shortcuts 收拢重复类名
- 用 Variants 写暗色、断点与状态
