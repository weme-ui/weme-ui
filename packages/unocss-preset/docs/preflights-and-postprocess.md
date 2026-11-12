# 理解 Preflights 与 Postprocess

类名负责单条声明。preflight 负责铺 reset、色板变量、主题 token 和 `@property`。postprocess 在声明已经生成之后，统一改 `!important` 和 `--un-` 前缀。

`preflights()` 的注册顺序是 `reset` → `preflight` → `custom` → `theme` → `property`。它们带的层是 `base`、`base`、`theme`、`theme`、`properties`。层数值是 `properties` -200、`theme` -150、`base` -100，数值更小的层写在更前面。因此成品 CSS 里先是 `@property`，然后是主题变量和色板，再然后才是 reset 与 `color-scheme`。

## 使用场景

- 页面出现浏览器默认外边距，想确认 reset 是否打开。
- 暗色只改了系统偏好，颜色却不变，要看变量写在哪个选择器上。
- 现有样式表盖过工具类，想给工具类加 `#app` 或 `!important`。
- 要把内部变量从 `--un-` 改成自己的前缀，避免和另一份 UnoCSS 冲突。

## reset 和 base

`reset: false` 时，`reset()` 返回空，不输出那份盒模型和表单修正。不写这个字段时会输出。reset 在生成时跟踪 `font.sans`、`font.mono` 和 `default.font`，所以即使用不到 `font-sans`，reset 打开时也会把对应变量带上。

base 层的 `preflight()` 没有开关，内容是：

```css
:root, .light { color-scheme: light; }
.dark { color-scheme: dark; }

[data-scaling='90%'] { --scaling: 0.9; }
[data-scaling='95%'] { --scaling: 0.95; }
[data-scaling='100%'] { --scaling: 1; }
[data-scaling='105%'] { --scaling: 1.05; }
[data-scaling='110%'] { --scaling: 1.1; }

[data-radius='none'] { --radius-factor: 0; }
[data-radius='xs'] { --radius-factor: 0.5; }
[data-radius='sm'] { --radius-factor: 0.75; }
[data-radius='md'] { --radius-factor: 1; }
[data-radius='lg'] { --radius-factor: 1.5; }
[data-radius='full'] { --radius-factor: 1.5; }
```

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [presetWemeUI({ reset: false })],
}
```

```html
<html class="dark" data-scaling="95%" data-radius="lg">
  <body class="bg-default text-default p-lg rounded-lg">
    没有 reset，但色板、缩放和圆角系数仍然在
  </body>
</html>
```

`data-radius="full"` 的系数是 `1.5`。主题选项 `radius: 'full'` 写的 `--default-radius-factor` 却是 `3`。属性在时，圆角公式先用 `--radius-factor`，所以页面上的 `full` 是 1.5 倍，不是 3 倍。

Sources: `packages/unocss/src/preflights/index.ts`, `packages/unocss/src/preflights/reset.ts`, `packages/unocss/src/preflights/preflight.ts`, `packages/unocss/src/custom/mappings.ts`, `packages/unocss/src/index.ts`

## 主题变量什么时候出现

`custom` 把三块拼在一起：全局 `cssVars`、各主题的颜色别名、各主题的 token 与 `cssVars`。别名只输出实际用到的阶。token 会整表输出，因此默认主题只要挂上，`--text`、`--bg`、`--border` 以及它们引用的 `neutral` / `iron` 阶就会出现，哪怕你只写了 `p-4`。

`theme` preflight 把跟踪到的非颜色主题写成 `--间距名` 这类变量，把颜色写成：

```css
:root { --indigo-9: /* 亮色 oklch */; }
.dark { --indigo-9: /* 暗色 oklch */; }

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root { --indigo-9: /* 亮色 p3 */; }
    .dark { --indigo-9: /* 暗色 p3 */; }
  }
}
```

没有被类名、token 或安全列表引用的阶不会出现。这个 preflight 还会扫描安全列表：条目按 `:` 拆开，左边必须是主题上的键。`colors:indigo-9` 会按 `['indigo', '9']` 去取颜色并跟踪。`bg-indigo` 这种类名不走这条分支，它由生成器匹配工具类时间接触发跟踪。

开发模式（`envMode === 'dev'`）保留注释和换行。其他模式会压成一行并去掉注释。

```html
<html class="dark" data-theme="default">
  <p class="bg-indigo text-inverted">祖先有 dark，--indigo-9 换成暗色值</p>
</html>
```

只打开系统暗色、根节点没有 `.dark` 时，`:root` 里仍是亮色值。`dark: 'media'` 不会把这组变量改挂到 `prefers-color-scheme`。

Sources: `packages/unocss/src/preflights/custom.ts`, `packages/unocss/src/preflights/theme.ts`, `packages/unocss/src/utils/utilities.ts`

## @property

用到阴影、环、透明度时，规则会登记 `--un-shadow`、`--un-ring-color`、`--un-bg-opacity` 等属性。`property` preflight 把它们收成一段 `@property`，并包在一条针对旧浏览器的 `@supports` 里。`properties` 层的声明不加 `important` 选项里的 `!important`。

默认前缀是 `un-`，所以看到的是 `--un-shadow`。把 `variablePrefix` 改成别的值后，同一段会变成新前缀，工具类里的 `var(--un-` 也会一起换。

Sources: `packages/unocss/src/preflights/property.ts`, `packages/unocss/src/utils/utilities.ts`, `packages/unocss/src/rules/shadow.ts`

## important 和变量前缀

postprocess 先跑 `important`，再跑 `varPrefix`。`variablePrefix` 仍是 `'un-'` 时，前缀处理器不注册。

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'

export default {
  presets: [
    presetWemeUI({
      important: '#app',
      variablePrefix: 'weme-',
    }),
  ],
}
```

`important: true` 给非 `properties` 层的声明值追加 ` !important`。`important: '#app'` 不改声明值，而是把选择器变成 `#app :is(.原来的选择器)`。已经以这个字符串开头的选择器不会再包一层。带 `::` 的伪元素会把 `::` 留在 `:is()` 外面。

组合示例，基于源码导出构造：

```html
<div id="app" class="dark">
  <button class="bg-accent text-inverted shadow-sm rounded-md px-lg py-sm tablet:shadow-md">
    包在 #app 里的按钮
  </button>
</div>
```

生成结果的形态是：

```css
#app :is(.bg-accent) { background-color: var(--accent-9); }
#app :is(.shadow-sm) { --weme-shadow: 0 2px 3px -2px var(--weme-shadow-color, rgba(0, 0, 0, 0.05)), /* ... */; }
@property --weme-shadow { syntax: "*"; inherits: false; initial-value: 0 0 #0000; }
```

`tablet:shadow-md` 同样包在 `#app :is(...)` 里，媒体查询留在外面。颜色变量 `--accent-9` 不受 `variablePrefix` 影响，前缀只替换以 `--un-` 开头的内部变量。

Sources: `packages/unocss/src/postprocess/default.ts`, `packages/unocss/src/postprocess/important.ts`, `packages/unocss/src/postprocess/varPrefix.ts`, `packages/unocss/src/index.ts`

## 注意事项

- 关掉 `reset` 不会关掉 `color-scheme`、`data-scaling`、`data-radius`。
- 色板的暗色选择器写死为 `.dark`。`dark: 'media'` 只改变 `dark:` / `light:` 工具类，不改变变量放在哪。
- `data-radius="full"` 是 1.5，主题配置 `radius: 'full'` 的默认系数是 3。两者不是同一个变量。
- `important: '#app'` 要求工具类的元素位于 `#app` 内部。类写在 `#app` 自己身上时，选择器 `#app :is(.bg-accent)` 匹配不到自身。
- `properties` 层不吃 `important: true`。
- 全局 `cssVars` 和默认 token 即使用不到相关类也会输出。Radix 阶只有被引用才输出。

## 相关页面

- 配置 Preset 与定制主题
- 使用 Radix Colors 刻度与别名
- 使用并覆盖自定义 CSS 变量
- 用 Variants 写暗色、断点与状态
