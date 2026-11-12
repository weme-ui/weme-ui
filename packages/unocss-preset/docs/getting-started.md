# 快速开始

把 `@weme-ui/unocss-preset` 交给 UnoCSS 之后，类名会解析成 Radix 色阶变量、语义 token，以及随 `data-scaling` 变化的间距。这一页只解决三件事：装上包、写上 `presets`、让一个页面同时出现颜色、文字和间距。

## 使用场景

- 新项目要一套带 12 阶颜色、暗色变量和语义背景/文字的原子类。
- 已有 UnoCSS 配置，只想加这一个 preset，不想先读完全部规则。
- 需要确认默认暗色是 `.dark` 类，断点是 `mobile` / `tablet` / `laptop` / `desktop` / `wide`。

## 安装

`package.json` 把 `unocss` 放在 `peerDependencies`（`^66.10.5`），本包自己依赖 `@unocss/core`。Node 要求 `>=22.14.0`。

```bash
bun add @weme-ui/unocss-preset unocss
```

入口导出两个名字：具名 `presetWemeUI`，以及同名的默认导出。类型是 `PresetWemeUIOptions`。

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'
import type { PresetWemeUIOptions } from '@weme-ui/unocss-preset'
```

## 最小配置

不传选项时，preset 自己补上这些值：`dark` 为 `'class'`，`variablePrefix` 为 `'un-'`，`important` 为 `false`，`arbitraryVariants` 与 `transformerVariantGroup` 为 `true`，`themes` / `colors` / `cssVars` 为空。空的 `themes` 会再放进内置的 `default` 主题。`reset` 只有在你写成 `false` 时才关闭，不写就输出 reset。

把 preset 放进 UnoCSS 的 `presets`。`defineConfig` 不属于本包，下面用配置对象本身表示：

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [presetWemeUI()],
}
```

默认主题的强调色别名是 `puerto`，中性色别名是 `iron`。所以什么类名都不改时，`bg-accent` 最终指向 `--accent-9`，而 `--accent-9` 的回退是 `--puerto-9`。

## 第一组类名

下面这段是一条通知条：中性底、强调色文字、固定间距和圆角。类名都能在规则或测试里对上。

```html
<article class="bg-muted text-highlighted p-4 rounded-lg flex-center gap-md">
  <strong class="text-sm fw-medium text-accent">已保存</strong>
  <span class="text-subtle">草稿写入本地，尚未同步。</span>
</article>
```

生成器里这几条类对应的声明是：

```css
.bg-muted { background-color: var(--bg-muted); }
.text-highlighted { color: var(--text-highlighted); }
.text-accent { color: var(--accent-9); }
.text-sm { font-size: var(--text-sm-fontSize); line-height: var(--un-leading, var(--text-sm-lineHeight)); }
.p-4 { padding: calc(var(--spacing) * 4); }
.gap-md { gap: var(--spacing-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.flex-center { align-items: center; justify-content: center; }
```

数字间距 `p-4` 乘的是 `--spacing`。命名间距 `gap-md` 用的是 `--spacing-md`。颜色类不写阶数时用第 9 阶，所以 `bg-indigo` 和 `bg-indigo-9` 是同一条背景。

## 暗色和断点

默认 `dark: 'class'`。色板变量写在 `.dark` 里，祖先带上 `class="dark"` 后，`bg-indigo`、`text-highlighted` 会换成暗色刻度，不必再写一条 `dark:` 类。`dark:` 用来在暗色下换另一套工具类。

断点来自主题：`tablet` 是 `768px`。`max-tablet:` 生成 `max-width: 767.9px`。

```html
<html class="dark">
  <section class="bg-indigo text-inverted p-lg tablet:p-xl max-tablet:text-sm">
    <h1 class="text-2xl dark:text-accent-12">夜间也能读的标题</h1>
  </section>
</html>
```

`dark:text-accent-12` 的选择器是 `.dark .dark\:text-accent-12`，颜色是 `var(--accent-12)`。`tablet:p-lg` 包在 `@media (min-width: 768px)` 里。

组合示例，基于源码导出构造：

```html
<html class="light" data-theme="default">
  <a
    class="inline-flex items-center gap-sm rounded-md bg-accent px-lg py-sm text-sm fw-medium text-inverted shadow-sm hover:bg-accent-10 dark:bg-accent-4 dark:text-accent-12 tablet:px-xl"
    href="/inbox"
  >
    打开收件箱
  </a>
</html>
```

亮色下按钮是强调色第 9 阶底、反色字。`hover:bg-accent-10` 只在指针悬停时升到第 10 阶。祖先变成 `.dark` 后，`dark:bg-accent-4` 和 `dark:text-accent-12` 换掉底和字。`tablet:px-xl` 在 768px 以上加大左右内边距。`data-theme="default"` 可以不写：默认主题的选择器同时包含 `:root`。

## 任意变体

`arbitraryVariants` 默认开启。入口注释里的写法可以生成子元素和属性选择器：

```html
<ul class="[&>*]:m-1">
  <li class="[&[open]]:p-2">一项</li>
</ul>
```

对应 CSS：

```css
.\[\&\>\*\]\:m-1 > * { margin: calc(var(--spacing) * 1); }
.\[\&\[open\]\]\:p-2[open] { padding: calc(var(--spacing) * 2); }
```

`transformerVariantGroup` 默认也会挂上 `@unocss/transformer-variant-group`，注释中的例子是 `b-(~ default)`。当前安装的 66.12.0 transformer 只返回高亮信息，不改写源码。把 `hover:(bg-accent text-inverted)` 交给生成器时，得不到 `hover:bg-accent`。类名请写成展开形式：`hover:bg-accent hover:text-inverted`。

## 注意事项

- 没写阶数的颜色类用第 9 阶。`bg-black` 也是 `--black-9`，不是常量 `#000`。
- 色板随 `.dark` 切换。`dark:` 是额外的工具类分支，不是「把颜色变成暗色」的开关。
- 变体组括号写法不要当成已经展开的类名。直接写 `hover:`、`tablet:` 前缀。
- `text-sm`、`text-base`、`text-lg` 是字号。`text-default`、`text-muted` 是语义颜色。`base` 在字号表里，不在颜色 token 的类名里。

## 相关页面

- 主题
- 颜色
- CSS 变量
- Variants
