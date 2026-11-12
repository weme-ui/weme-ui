# Shortcuts

shortcut 在匹配工具类之前把一个短类展开成若干条已经存在的工具类，再由那些工具类产出 CSS。本包只有两处：`utilitiesShortcuts` 里的定位、对齐、状态和层叠，以及 `containerShortcuts` 里的 `container`。

补全表 `shorthands` 只有 `position` 和 `globalKeyword`，不是一套新的类名。

## 使用场景

- 图标、空状态、对话框需要反复写居中。
- 禁用和加载要同时去掉选择、指针事件，并在禁用时降低透明度。
- 弹层、菜单、遮罩、对话框、提示需要固定的层叠顺序。
- 页面主栏要在 `tablet`、`laptop` 这些断点上收成 `container` 的最大宽度。

## 全部工具 shortcut

| 类名 | 展开成 |
| --- | --- |
| `absolute-center` | `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` |
| `absolute-x-center` | `left-1/2 -translate-x-1/2` |
| `absolute-y-center` | `top-1/2 -translate-y-1/2` |
| `flex-center` | `items-center justify-center` |
| `flex-x-center` | `justify-center` |
| `flex-y-center` | `items-center` |
| `is-disabled` | `op-50 select-none pointer-events-none` |
| `is-loading` | `select-none pointer-events-none` |
| `z-base` | `z-0` |
| `z-raised` | `z-1` |
| `z-popover` | `z-100` |
| `z-dropdown` | `z-200` |
| `z-overlay` | `z-300` |
| `z-modal` | `z-400` |
| `z-toast` | `z-500` |

居中类自己不包含 `absolute` 或 `relative`。绝对定位的居中要先写 `absolute`，父级写 `relative`。

```html
<div class="relative h-screen-tablet bg-muted">
  <div class="absolute absolute-center flex flex-col flex-center gap-sm bg-elevated text-highlighted shadow-md rounded-lg p-xl">
    <p class="text-lg">没有新的通知</p>
    <p class="text-sm text-subtle">同步完成后会显示在这里</p>
  </div>
</div>
```

`flex-center` 生成的是 shortcut 层上的声明，而不是在 HTML 里再插入 `items-center`：

```css
.flex-center {
  align-items: center;
  justify-content: center;
}
```

禁用和加载：

```html
<button class="bg-accent text-inverted rounded-md px-lg py-sm is-disabled">不可提交</button>
<button class="bg-neutral-3 text-neutral-12 is-loading">
  <span class="animate-pulse">正在保存</span>
</button>
```

`is-disabled` 含 `op-50`，所以不透明度为 50%。`is-loading` 不改透明度，只禁止选择和指针。两者都不会自动设置 `aria-disabled` 或 `disabled` 属性，属性要写在元素上。

层叠按这个顺序从低到高：页面内容 `z-base`，略抬起 `z-raised`，弹出说明 `z-popover`，菜单 `z-dropdown`，遮罩 `z-overlay`，对话框 `z-modal`，提示 `z-toast`。

```html
<div class="fixed inset-0 z-overlay bg-black/40"></div>
<div class="fixed absolute-center z-modal w-md bg-elevated text-default shadow-lg rounded-lg p-xl">
  对话框在遮罩上面
</div>
<div class="fixed z-toast bottom-4 right-4 bg-inverted text-inverted rounded-md px-lg py-sm shadow-md">
  已复制
</div>
```

`inset-0` 来自定位规则，配合 `fixed`。`bg-black/40` 是黑色第 9 阶的 40% 混合，不是纯黑半透明；要透明黑用 `bg-black-auto`。

## container

`container` 不是宽度工具类 `w-md`。shortcut 把 `container` 展开成内部规则 `__container`，并给每个断点再挂一条 `断点:__container`。

```html
<div class="container bg-default text-default px-lg">
  主栏在每个断点上使用该断点的最大宽度
</div>

<div class="laptop:container">
  从 laptop 起才开始按断点收宽度
</div>
```

`laptop:container` 只保留 `laptop` 以及它后面的断点（`desktop`、`wide`）。名字必须是 `mobile`、`tablet`、`laptop`、`desktop`、`wide` 之一，否则这条 shortcut 不生效。

`__container` 在没有变体时写 `width: 100%`。遇到断点变体时，最大宽度取该断点的 `min-width`。`theme.containers`（注意是复数）若提供 `maxWidth`、`padding`、`center`，会改写这三项。`theme()` 没有设置 `containers`。默认因此没有自动水平居中，也没有额外的容器 padding。页面上的 `px-lg` 仍是普通间距类。

`theme.container`（单数）是另一张表，给 `w-md`、`max-w-prose`、`@md:` 用，键是 `3xs` 到 `7xl` 和 `prose`。它不驱动 `container` 这个 shortcut。

## 和变体一起写

shortcut 本身可以再加变体。变体作用在展开后的声明上。

```html
<div class="relative">
  <span class="absolute absolute-x-center top-0 tablet:absolute-center z-popover bg-inverted text-inverted text-sm rounded-md px-sm py-xs">
    提示
  </span>
</div>
```

窄屏只做水平居中并贴住顶部；`tablet:absolute-center` 在 768px 以上改成双向居中。若两条定位 shortcut 同时生效，后写的变体规则靠媒体查询叠加上去，基础的 `absolute-x-center` 仍在。需要互斥时，用 `max-tablet:` 关掉窄屏那套。

组合示例，基于源码导出构造：

```html
<div class="relative min-h-screen bg-muted">
  <header class="z-raised flex flex-center gap-md border-b border-default bg-elevated px-lg py-sm">
    <strong class="text-highlighted">收件箱</strong>
  </header>

  <div class="container py-xl">
    <button class="bg-accent text-inverted rounded-md px-lg py-sm aria-disabled:is-disabled">
      新建
    </button>
  </div>

  <div class="fixed inset-0 z-overlay bg-black/40"></div>
  <section class="fixed z-modal absolute-center w-full max-w-md bg-elevated text-default shadow-xl rounded-lg p-xl max-tablet:p-lg">
    <h2 class="text-xl text-highlighted">删除这 12 封邮件</h2>
    <p class="text-subtle mt-sm">删除后不能从这里恢复。</p>
    <div class="mt-lg flex flex-x-center gap-sm">
      <button class="rounded-md bg-neutral-3 px-lg py-sm text-neutral-12">取消</button>
      <button class="rounded-md bg-error px-lg py-sm text-inverted">删除</button>
    </div>
  </section>

  <p class="fixed z-toast bottom-4 left-1/2 absolute-x-center bg-inverted text-inverted rounded-md px-lg py-sm">
    已删除
  </p>
</div>
```

对话框用 `z-modal`，遮罩用 `z-overlay`，提示用 `z-toast`。`aria-disabled:is-disabled` 只在 `aria-disabled="true"` 时展开那三条禁用声明。`max-w-md` 读 `container.md` 的 `28rem`，和 shortcut `container` 无关。

## 补全缩写

preset 的 `autocomplete.shorthands` 是：

```ts
{
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  globalKeyword: globalKeywords,
}
```

这只影响编辑器补全里的占位，不会多出名为 `globalKeyword` 的类。类名仍然是 `relative`、`absolute` 这些。

## 注意事项

- `absolute-center` 不含 `absolute`。父级要 `relative`，自身要 `absolute` 或 `fixed`。
- `bottom-lg`、`right-lg` 不会命中。边缘用 `bottom-4`、`right-4` 或 `bottom-1/2`。命名间距键用在 `p-`、`m-`、`gap-`。
- `is-disabled` 不会写 ARIA。需要选择器联动时用 `aria-disabled:is-disabled`，并在元素上设置属性。
- `z-modal` 是 `400`，`z-toast` 是 `500`。自定义 `z-1000` 这种数字类可以，但不会自动插进这套命名层。
- `container` 看的是断点 `mobile`…`wide`。`w-md` 和 `@md:` 看的是 `theme.container` 的 `28rem`。
- 默认没有 `theme.containers.center`，`container` 不会自己 `margin-left/right: auto`。
- 没有更多内置 shortcut。按钮的「实心、圆角、内边距」要自己写成工具类，或在应用的 UnoCSS 配置里另加 shortcut。本包入口没有导出 `defineShortcut`。

## 相关页面

- Rules
- Variants
- 组合
- 新增规则
