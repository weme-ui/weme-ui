---
name: weme-ui-tests
description: >-
  Generates or syncs Vitest tests for a Weme UI registry item from a given path:
  <name>.test.ts and registry.json kind:test entries. Prefers style/util unit
  tests (L1); for interactive/form components also requires mount (or Testing
  Library) behavior assertions plus vitest-axe (L2). Use when the user names
  weme-ui-tests, asks to add or sync component tests, or points at
  registry/<library>/src/<section>/<name>/ for testing.
---

# Weme UI Tests

与 `weme-ui-docs` 并列：文档走 docs，测试走本 skill。不 scaffold、不写组件实现、**默认不安装包**。

用户通常已完成组件主体；指定 item 目录后生成或同步测试。

行为层惯例参考 reka-ui core（原 radix-vue）：`given` / `when` 结构、`mount` + `attachTo: document.body`、`vitest-axe`。Weme 另有 style 纯函数层：有 `*.style.ts` 时 L1 **仍优先**，与 L2 并存，不互相替代。

## 输入

```text
registry/slim/src/components/icon/
```

## 编写前必读

```text
registry/<library>/src/<section>/<name>/   # *.vue、*.props.ts、*.style.ts、现有 *.test.ts
registry/<library>/registry.json
registry/<library>/vitest.config.ts        # 若不存在或缺少 setupFiles 见下方模板
registry/<library>/vitest.setup.ts         # 若不存在且需要 L2/axe 见下方模板
registry/slim/src/components/button/button.test.ts   # L1 style 范本
```

## 模式判定

| 条件 | 模式 |
| --- | --- |
| 无 `*.test.ts`，或用户明确要求「生成 / 重新生成」 | **A：生成** |
| 已有测试，或用户要求「同步测试」 | **B：同步** |

有测试且未说「重新生成」→ 默认 **B**。用户话术优先。

## 测法分层

| 层级 | 何时 | 要求 |
| --- | --- | --- |
| **L1 Style** | 有 `*.style.ts`（或可抽离 util） | 必写 `useXxxStyle` / util 纯函数单测（对齐 `button.test.ts`） |
| **L2 Behavior** | 有交互 / 表单 / 键盘 / 开关状态 / 明显 a11y 契约 | 必写 `mount`（或 TL `render`）+ 行为断言 + **vitest-axe** |
| **L3 Browser / SSR** | 需真实布局、原生 focus/submit，或无 DOM SSR | 可选；`*.browser.test.ts` / `*.ssr.test.ts`；**默认 slim 不生成** |

判定规则：

- 仅展示 / 样式容器（如纯 `icon-tile` style）→ **L1 即可**
- Input / Form / FormField / Button（可点按）/ Link 等 → **L1（若有 style）+ L2**
- 同一 `<name>.test.ts` 可同时含 style `describe` 与 behavior `describe`；过大时再拆，仍优先单文件
- **不写** Playwright E2E / 视觉回归；browser 层仅在用户点名或 L2 无法覆盖时再写

## 行为测约定（L2）

对齐 reka-ui core：

- **结构**：`describe('given …')` → nested `when` / `after`；共享 wrapper 用 `beforeEach`
- **Fixture**：复杂组合用同目录 `_Name.vue`（测试专用，**勿**登记进 `registry.json` 安装文件列表），或测试内 `defineComponent`
- **查询**：交互流程优先 `@testing-library/vue`（`render` / `fireEvent` / `screen`）；查属性 / 存在可用 VTU `find` / `get`
- **Mount**：交互组件默认 `mount`，常配 `attachTo: document.body`（axe 与焦点相关用例需要）
- **断言清单**（源码能核对才写）：
  - `data-state` / `data-disabled` / `aria-*` / `role`
  - 点击、键盘（Enter / Space / Arrow* 等文档化交互）
  - `update:modelValue` / 自定义 emits
  - 表单：hidden input、`required`、submit 后 FormData（可复用 `handleSubmit` helper 模式）
- **axe**（交互 / 表单 L2 默认必写）：

```ts
const wrapper = mount(Comp, { attachTo: document.body, /* props / slots */ })
expect(await axe(wrapper.element)).toHaveNoViolations()
```

必要时可局部关闭规则（如 `label`、`nested-interactive`），须在注释中说明原因。

可选：library 内抽 `src/test/utils.ts`（如 `handleSubmit`、`sleep`）；本 skill **不强制**立刻创建该文件。

## 模式 A：生成

1. 读源码，判定 L1 / L2（及是否需 L3）
2. 写入同目录 `<name>.test.ts`
3. 在 `registry.json` 对应 item 的 `files` 中追加（已存在则跳过）：

```json
{
  "type": "component",
  "kind": "test",
  "path": "src/components/<name>/<name>.test.ts"
}
```

`type` 与 item 一致（`component` / `composable` / …）。`_*.vue` fixture **不要**登记。

4. 若目标 library **尚无** `vitest.setup.ts` 且本次写了 L2/axe：按下方模板添加 setup，并确保 `vitest.config.ts` 含 `setupFiles`
5. 若缺 `vitest.config.ts`：按下方模板创建（slim 已提供时可沿用并补 `setupFiles`）
6. 若缺依赖：列出需用户安装的包名，**不要**自行 `bun add`

## 模式 B：同步

- 按当前源码更新 style / 行为断言（class、props、默认值、a11y 等）
- 若组件已具备交互契约但缺行为用例或 axe → **补 L2**（不删仍有效的用例）
- 失效的改写或简短说明
- 不改组件实现
- 若补 L2 时 library 尚无 setup → 按模板补 `vitest.setup.ts` + config `setupFiles`

## 依赖（用户安装）

`vitest` 通常已在 library `devDependencies`。**不要擅自 `bun add`**；缺包时只列出包名请用户安装。

slim（`registry/slim`）已具备：`@vue/test-utils`、`@testing-library/vue`、`happy-dom`、`vitest-axe`、`@vue/server-renderer`、`@vitejs/plugin-vue`。

| 包 | 用途 |
| --- | --- |
| `vitest` | 已有 |
| `@vue/test-utils` | mount / shallowMount |
| `@testing-library/vue` | 用户交互（render / fireEvent / screen） |
| `happy-dom` | Vitest DOM |
| `vitest-axe` | a11y（`axe` + `toHaveNoViolations`） |
| `@vitejs/plugin-vue` | 编译 `.vue` |
| `@vue/server-renderer` | 可选 SSR 测 |

**仅 L1**：无需上述 mount/axe 包即可跑纯函数单测。

其他 library 若缺包，示例（由用户执行）：

```bash
bun add -d --cwd registry/<library> @vue/test-utils @testing-library/vue happy-dom vitest-axe @vitejs/plugin-vue
```

## vitest.setup.ts 模板

registry library 根目录（如 `registry/slim/vitest.setup.ts`）。**仅在需要 L2/axe 且文件尚不存在时创建**：

```ts
import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

// Optional: silence missing browser APIs in happy-dom
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView ??= () => {}
  // @ts-expect-error test stub
  window.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
```

- `expect.extend(matchers)`：注册 `toHaveNoViolations`
- **Vitest 4**：同目录还需 `vitest-env.d.ts`（见下）与 `vue-shim.d.ts`；`tsconfig.json` **include** 测试文件，**勿** exclude `*.test.ts`（否则 IDE No tsconfig）

**vitest-env.d.ts**（library 根目录）：

```ts
import type { AxeMatchers } from 'vitest-axe/matchers'

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

export {}
```

## vitest.config.ts 模板

registry library 根目录（如 `registry/slim/vitest.config.ts`）：

```ts
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

function resolve(dir: string) {
  return path.resolve(import.meta.dirname, dir)
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

- 纯 L1、且尚未引入 axe 时：可暂不设 `setupFiles`；一旦写 L2/axe 必须配置
- 默认 `include` 只含 `*.test.ts`；L3 的 `*.browser.test.ts` / `*.ssr.test.ts` 需用户点名后再扩展 `include` 与环境
- 纯 node 单测在 happy-dom 下也可运行

## 测试文件约定

- 路径：与组件同目录 `<name>.test.ts`
- API：`import { describe, expect, it } from 'vitest'`（按需 `beforeEach` / `vi`）
- describe 文案可用英文（与现有 button 测试一致）；与用户沟通用中文

### L1 style 范本

```ts
import { describe, expect, it } from 'vitest'
import { useButtonStyle } from './button.style'

describe('button', () => {
  it('applies default size and radius variants', () => {
    const ui = useButtonStyle({})
    expect(ui.root()).toContain('h-8')
  })
})
```

### L2 behavior + axe 范本

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Button from './button.vue'

describe('button', () => {
  describe('given a default button', () => {
    it('has no accessibility violations', async () => {
      const wrapper = mount(Button, {
        attachTo: document.body,
        slots: { default: 'Save' },
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('emits click when pressed', async () => {
      const wrapper = mount(Button, {
        attachTo: document.body,
        slots: { default: 'Save' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      wrapper.unmount()
    })
  })

  describe('given a disabled button', () => {
    it('does not emit click', async () => {
      const wrapper = mount(Button, {
        attachTo: document.body,
        props: { disabled: true },
        slots: { default: 'Save' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
      wrapper.unmount()
    })
  })
})
```

交互流程更重时可用 `@testing-library/vue`：

```ts
import { render, fireEvent, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Input from './input.vue'

describe('input', () => {
  describe('given a clearable input with value', () => {
    it('clears value when clear control is activated', async () => {
      const { emitted, container } = render(Input, {
        props: {
          modelValue: 'hello',
          clearable: true,
        },
      })
      expect(await axe(container)).toHaveNoViolations()
      // query/activate clear control from actual markup — do not invent selectors
      await fireEvent.click(screen.getByRole('button', { name: /clear/i }))
      expect(emitted()['update:modelValue']?.at(-1)).toEqual([''])
    })
  })
})
```

（上例中的 role / name 必须与组件真实 DOM 一致；对不上就改查询或跳过该断言，**禁止编造**。）

## 验证

```bash
bun run test
```

禁止 `bun test`（见根目录 `AGENTS.md`）。可先 `--filter @weme-ui/slim`（或对应 library）。

## 规则

- 断言须能从源码核对；不编造 class / 行为 / a11y 属性
- 有 `*.style.ts` → 必写 L1；交互 / 表单 → 必写 L2（含 axe）
- 不写 E2E / 视觉回归；不默认生成 L3 browser / SSR
- 不 scaffold、不写组件实现、不擅自安装依赖
- 说明与 describe 文案可用英文；与用户沟通用中文
