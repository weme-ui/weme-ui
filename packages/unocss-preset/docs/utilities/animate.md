# Animation

Preset 同时提供两种动画写法，**类名相近但职责不同**，选错会「看起来像生效了其实只设了变量」或「播了整段固定动画」。

|                | A. 完整 keyframe                                             | B. 组合 Enter / Exit                                                |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| 典型类名       | `animate-fade-in`、`animate-spin`、`animate-bounce-in`       | `animate-in fade-in`、`animate-out slide-out-to-top`                |
| 一句话         | **一个** `animate-{name}` = 播 theme 里那一整段 `@keyframes` | **`animate-in`/`out` + 若干修饰符**；修饰符只改 CSS 变量            |
| 适合           | 固定套路、Attention Seekers、一次性展示动画                  | Dialog / Popper / 折叠面板进出场；要拼 fade+slide+zoom              |
| 不适合         | 需要临时改「从哪边滑、淡到多少」                             | 需要 Animate.css 那种多段复杂曲线（tada、hinge…）                   |
| 谁触发播放     | `animate-{name}` 本身                                        | **必须有** `animate-in` 或 `animate-out`；光写 `fade-in` **不会**动 |
| 内部 keyframe  | 与类名后缀同名（如 `fade-in`）                               | 固定为 `un-enter` / `un-exit`（不要手写 `animate-un-enter`）        |
| Theme 里存的是 | 各具名 `@keyframes` 字符串                                   | 仅 `un-enter` / `un-exit` 两段「读 CSS 变量」的 keyframe            |

**易混类名（最常见踩坑）：**

| 你想要的                 | 正确写法               | 错误 / 无效                                             |
| ------------------------ | ---------------------- | ------------------------------------------------------- |
| 播 theme 里完整淡入      | `animate-fade-in`      | `fade-in`（只设变量，没有 base 就不动）                 |
| 组合淡入（可再叠 slide） | `animate-in fade-in`   | `animate-fade-in fade-in`（两套叠在一起，语义混乱）     |
| 组合退出                 | `animate-out fade-out` | `animate-fade-out`（那是完整 keyframe，不是 Exit 组合） |

**边界约定：**

1. **同一元素、同一次进出场，只选一套模型**，不要 `animate-fade-in` 再叠 `animate-in`。
2. **无 `animate-` 前缀的** `fade-in` / `zoom-in` / `spin-in` / `slide-in-from-*` **只属于 B**，给 A 用不上。
3. **带 `animate-` 前缀且 name 是 theme keyframe** 的属于 A（`animate-spin`、`animate-slide-in-up`…）。例外：`animate-in` / `animate-out` 是 B 的 Shortcut，不是 A。
4. **参数类** `animate-duration-*` / `animate-delay-*` / `animate-ease-*` **两套都能用**；B 还依赖它们双写到 `--un-animation-*`。Transition 的 `duration-*` **不属于**任一动画模型。
5. Theme 里虽有名为 `fade-in`、`zoom-in` 的 keyframe，那是给 **`animate-fade-in` / `animate-zoom-in`（A）** 用的；与工具类 `fade-in` / `zoom-in`（B 修饰符）**同名不同物**。

---

## 模型 A：完整 keyframe — `animations`

一个类名对应一整段 `@keyframes`（Animate.css 风格）。

| 示例                                             | CSS                                                 |
| ------------------------------------------------ | --------------------------------------------------- |
| `animate-spin` `animate-pulse` `animate-fade-in` | animation + `@keyframes`                            |
| `animate-none`                                   | `animation: none`                                   |
| `animate-duration-500`                           | `animation-duration` + `--un-animation-duration`    |
| `animate-delay-200`                              | `animation-delay` + `--un-animation-delay`          |
| `animate-ease-in`                                | `animation-timing-function` + `--un-animation-ease` |
| `animate-paused` `animate-running`               | `animation-play-state`                              |
| `animate-count-infinite`                         | `animation-iteration-count`                         |
| `animate-direction-reverse`                      | `animation-direction`                               |
| `animate-fill-forwards`                          | `animation-fill-mode`                               |

`animate-duration-*` / `animate-delay-*` / `animate-ease-*` 会**双写**到 `--un-animation-*`（模型 B 的 `animate-in` 也读这些变量）。

### 内置 keyframe 名称

可用 `animate-{name}`，内置名称包括：

`pulse`、`bounce`、`spin`、`ping`、`bounce-alt`、`flash`、`pulse-alt`、`rubber-band`、`shake-x`、`shake-y`、`head-shake`、`swing`、`tada`、`wobble`、`jello`、`heart-beat`、`hinge`、`jack-in-the-box`、

`light-speed-in-left/right`、`light-speed-out-left/right`、

`flip`、`flip-in-x/y`、`flip-out-x/y`、

`rotate-in`、`rotate-in-down-left/right`、`rotate-in-up-left/right`、`rotate-out` 及对应 down/up 方向、

`roll-in/out`、

`zoom-in`、`zoom-in-down/left/right/up`、`zoom-out` 及对应方向、

`bounce-in`、`bounce-in-down/left/right/up`、`bounce-out` 及对应方向、

`slide-in-down/left/right/up`、`slide-out-down/left/right/up`、

`fade-in`、`fade-in-down/up/left/right`（含 `-big` 与对角）、`fade-out` 同系列、

`back-in-down/left/right/up`、`back-out-down/left/right/up`

完整 keyframes 字符串见 `src/theme/animation.ts`。

---

## 模型 B：组合 Enter / Exit — `animateModifiers` + `animateInOutShortcuts`

可组合的进入 / 退出（[tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) 模型）。

拼装顺序：

1. `animate-in` / `animate-out`（Shortcut，内部 keyframe：`un-enter` / `un-exit`）
2. `fade-*` / `zoom-*` / `spin-*` / `slide-*`（只写 CSS 变量）
3. 可选 `animate-duration-*` 等（不要用 transition 的 `duration-*`）

### 基础用法

```html
<!-- 进入：淡入 + 缩放 + 从上方滑入，500ms -->
<div class="animate-in fade-in zoom-in slide-in-from-top-8 animate-duration-500">...</div>

<!-- 退出 -->
<div class="animate-out fade-out slide-out-to-top-8 animate-duration-300">...</div>
```

配合 Variants（例如按 `data-state` 切换）：

```html
<div
  class="data-[state=open]:animate-in data-[state=closed]:animate-out fade-in fade-out slide-in-from-top-2 slide-out-to-top-2 animate-duration-200"
  data-state="open"
>
  ...
</div>
```

### Base：`animate-in` / `animate-out`

| Theme keyframe | 对外工具类    | 说明                                                                                                     |
| -------------- | ------------- | -------------------------------------------------------------------------------------------------------- |
| `un-enter`     | `animate-in`  | Shortcut：展开 `keyframes-un-enter`，设置 `animation-*`（读 `--un-animation-*`），并注册相关 `@property` |
| `un-exit`      | `animate-out` | 对称，使用 `un-exit`                                                                                     |

默认时长 `150ms`、easing `ease`、delay `0s`、iteration `1`、direction `normal`、fill-mode `none`。  
**不会**回退到 transition 用的 `--un-duration` / `--un-ease`。

请用 `animate-in` / `animate-out`，不要手写 `animate-un-enter`（会走模型 A catch-all，缺少 B 的默认变量与 `@property`）。

### 修饰符

修饰符本身**不会**播放动画；必须同时有 `animate-in` 或 `animate-out`。

**Fade**

| 类名                      | CSS 变量                                                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| `fade-in`                 | `--un-enter-opacity: 0%`（默认可视为从透明进入）                         |
| `fade-in-*`               | `--un-enter-opacity`（如 `fade-in-50` → `50%`；也支持 bracket / cssvar） |
| `fade-out` / `fade-out-*` | `--un-exit-opacity`                                                      |

**Zoom**

| 类名                      | CSS 变量                                          |
| ------------------------- | ------------------------------------------------- |
| `zoom-in`                 | `--un-enter-scale: 0%`                            |
| `zoom-in-*`               | `--un-enter-scale`（百分比 / fraction / bracket） |
| `zoom-out` / `zoom-out-*` | `--un-exit-scale`                                 |

**Spin**

| 类名                      | CSS 变量                                         |
| ------------------------- | ------------------------------------------------ |
| `spin-in`                 | `--un-enter-rotate: 30deg`                       |
| `spin-in-*`               | `--un-enter-rotate`（如 `spin-in-90` → `90deg`） |
| `spin-out` / `spin-out-*` | `--un-exit-rotate`                               |

负角度用 bracket：`spin-in-[-30deg]`。不提供 `-spin-in-*` / `-zoom-in-*`。

**Slide**（仅 `top` / `bottom` / `left` / `right`，可写短名 `t` `b` `l` `r`）

| 类名                                              | CSS 变量                                                                           |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `slide-in-from-top` / `bottom` / `left` / `right` | `--un-enter-translate-*`（默认 `±100%`）                                           |
| `slide-in-from-{dir}-*`                           | 同上；数字走 spacing（如 `slide-in-from-top-8` → `calc(var(--spacing) * 8 * -1)`） |
| `slide-out-to-top` / `bottom` / `left` / `right`  | `--un-exit-translate-*`                                                            |
| `slide-out-to-{dir}-*`                            | 同上                                                                               |

`start` / `end`（RTL）与 `blur-in` / `blur-out` 尚未提供（见 RFC 0003 Phase 2）。

### 参数类（与模型 A 共用）

| 类名                 | 作用                                                |
| -------------------- | --------------------------------------------------- |
| `animate-duration-*` | `animation-duration` + `--un-animation-duration`    |
| `animate-delay-*`    | `animation-delay` + `--un-animation-delay`          |
| `animate-ease-*`     | `animation-timing-function` + `--un-animation-ease` |

普通 `duration-*` / `delay-*` / `ease-*` 只服务 transition，**不会**驱动 `animate-in`。

### CSS 变量一览

**变换（由修饰符写入，由 `un-enter` / `un-exit` 读取）：**

| 变量                                                   | 默认（`@property`） | 用途                                              |
| ------------------------------------------------------ | ------------------- | ------------------------------------------------- |
| `--un-enter-opacity` / `--un-exit-opacity`             | `1`                 | 透明度                                            |
| `--un-enter-scale` / `--un-exit-scale`                 | `1`                 | 缩放                                              |
| `--un-enter-rotate` / `--un-exit-rotate`               | `0`                 | 旋转                                              |
| `--un-enter-translate-x/y` / `--un-exit-translate-x/y` | `0`                 | 位移                                              |
| `--un-enter-blur` / `--un-exit-blur`                   | `0`                 | 模糊（keyframe 已预留；`blur-in` 工具类 Phase 2） |

**动画参数（由 `animate-duration-*` 等双写，由 base shortcut 读取）：**

| 变量                             | 默认回退 |
| -------------------------------- | -------- |
| `--un-animation-duration`        | `150ms`  |
| `--un-animation-ease`            | `ease`   |
| `--un-animation-delay`           | `0s`     |
| `--un-animation-iteration-count` | `1`      |
| `--un-animation-direction`       | `normal` |
| `--un-animation-fill-mode`       | `none`   |

前缀随 `variablePrefix` / postprocess 替换（默认 `--un-`）。
