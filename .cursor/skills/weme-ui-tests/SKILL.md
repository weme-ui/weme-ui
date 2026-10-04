---
name: weme-ui-tests
description: >-
  Generates or syncs Vitest tests for a Weme UI registry item from a given path:
  <name>.test.ts and registry.json kind:test entries. Prefers style/util unit tests;
  mounts Vue wrappers with @vue/test-utils when needed. Use when the user names
  weme-ui-tests, asks to add or sync component tests, or points at
  registry/<library>/src/<section>/<name>/ for testing.
---

# Weme UI Tests

与 `weme-ui-docs` 并列：文档走 docs，测试走本 skill。不 scaffold、不写组件实现、**不安装包**。

用户通常已完成组件主体；指定 item 目录后生成或同步测试。

## 输入

```text
registry/slim/src/components/icon/
```

## 编写前必读

```text
registry/<library>/src/<section>/<name>/   # *.vue、*.props.ts、*.style.ts、现有 *.test.ts
registry/<library>/registry.json
registry/<library>/vitest.config.ts        # 若不存在见下方配置
registry/slim/src/components/button/button.test.ts   # style 单测范本
```

## 模式判定

| 条件 | 模式 |
| --- | --- |
| 无 `*.test.ts`，或用户明确要求「生成 / 重新生成」 | **A：生成** |
| 已有测试，或用户要求「同步测试」 | **B：同步** |

有测试且未说「重新生成」→ 默认 **B**。用户话术优先。

## 测法选择

| 组件形态 | 测法 | 说明 |
| --- | --- | --- |
| 有 `*.style.ts` / 可抽离 util | 纯函数单测 | 优先；对齐 `button.test.ts` |
| 几乎只有 Vue 包装 | `@vue/test-utils` mount | 1～2 个关键 props / 渲染用例 |
| 复杂 a11y / E2E | 不做 | 超出本 skill |

默认：**能单测逻辑就不 mount**。

## 模式 A：生成

1. 读源码，按上表选择测法
2. 写入同目录 `<name>.test.ts`
3. 在 `registry.json` 对应 item 的 `files` 中追加（已存在则跳过）：

```json
{
  "type": "component",
  "kind": "test",
  "path": "src/components/<name>/<name>.test.ts"
}
```

`type` 与 item 一致（`component` / `composable` / …）。

4. 若缺 Vitest Vue/DOM 依赖：列出需用户安装的包，**不要**自行 `bun add`
5. 若缺 `vitest.config.ts`：按下方模板创建（slim 已提供时可直接沿用）

## 模式 B：同步

- 按当前源码更新断言（class、props、默认值等）
- 不擅自删除仍有效的用例；失效的改写或简短说明
- 不改组件实现

## 依赖（用户安装）

`vitest` 通常已在 library `devDependencies`。

**仅 style/util 单测**：无需额外包。

**需要 mount 时**，请用户安装（示例：slim）：

```bash
bun add -d --cwd registry/slim @vue/test-utils happy-dom @vitejs/plugin-vue
```

| 包 | 用途 |
| --- | --- |
| `vitest` | 已有 |
| `@vue/test-utils` | mount |
| `happy-dom` | Vitest DOM |
| `@vitejs/plugin-vue` | 编译 `.vue`（可用根 `catalog:dev`） |

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
  },
})
```

纯 node 单测在 happy-dom 下也可运行。若仅有 node 测试且用户未装 happy-dom，可暂用 `environment: 'node'`，但 mount 用例需要再改回 `happy-dom`。

## 测试文件约定

- 路径：与组件同目录 `<name>.test.ts`
- API：`import { describe, expect, it } from 'vitest'`
- style 范本：

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

- mount 范本（需依赖就绪）：

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Icon from './icon.vue'

describe('icon', () => {
  it('renders with name prop', () => {
    const wrapper = mount(Icon, { props: { name: 'circle' } })
    expect(wrapper.exists()).toBe(true)
  })
})
```

## 验证

```bash
bun run test
```

禁止 `bun test`（见根目录 `AGENTS.md`）。可先 `--filter @weme-ui/slim`（或对应 library）。

## 规则

- 断言须能从源码核对；不编造 class / 行为
- 不写 E2E / 视觉回归
- 说明与 describe 文案可用英文（与现有 button 测试一致）；与用户沟通用中文
