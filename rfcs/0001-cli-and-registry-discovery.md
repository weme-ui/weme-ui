# RFC 0001：CLI 命令面与 Registry 发现

- **状态**：草案
- **相关 schema**：`manifest.schema.json`、`registry.schema.json`、`config.schema.json`、`lockfile.schema.json`

## 摘要

约定 `@weme-ui/weme-ui` CLI 的命令分层，以及 `manifest.json` 作为「仅凭 repo URL 发现并注册 registry」的入口。消费侧以 project 操作为主；作者侧以 `registry` 子命令维护 catalog。实现优先级与落点（CLI vs 仓库 scripts）不在本文展开。

## 动机

1. 消费项目注册 registry 时，不应要求用户知道仓库内的物理目录布局。
2. 一个 repo 可托管多个 registry；需要在登记时发现并允许多选。
3. CLI 同时存在「装组件」与「维护 registry」两类受众，命令名需要隔离，避免根级 `build` 等歧义。

## `manifest.json`：远程发现入口

### 职责

`manifest.json` 固定位于 **registry 所在 git 仓库的根目录**。它不是本仓私有的构建产物约定，而是对外的发现索引：

```json
{
  "$schema": "https://weme-ui.github.io/weme-ui/manifest.schema.json",
  "registries": {
    "weme-ui/core": "registry/core",
    "weme-ui/slim": "registry/slim"
  }
}
```

- **key**：逻辑名 `owner/registry`
- **value**：相对该 repo 根目录的路径，指向该 registry 根（含 `registry.json` 与 items）
- 路径 **无强制布局**：可以是 `registry/slim`、`.`、`packages/ui` 等任意相对位置

### 强制要求

远程发现 **必须** 存在仓根 `manifest.json`。不支持「仅有根目录 `registry.json`、无 manifest」的隐式单项 registry；缺少 manifest 即发现失败。

### ref

- 默认 ref 为 `main`
- 支持在 repo URL 中通过 `/tree/<ref>` 指定 branch（例如 `https://github.com/weme-ui/weme-ui/tree/main`）
- **不**提供单独的 `--ref`；第一版也不扩展 tag / commit 的专门解析（需要时仍可通过 `/tree/<name>` 指向同名分支）

raw 地址形态示例：

```text
https://raw.githubusercontent.com/<owner>/<repo>/refs/heads/<ref>/manifest.json
```

### 登记流程

用户只需提供 **repo URL**（例如在 `init` 或登记源时）：

1. 解析 repo URL（含可选 `/tree/<ref>`，否则 `main`），规范为 raw 地址，读取根目录 `manifest.json`
2. 解析 `registries` 映射
3. 仅一个 registry → 可直接选用；多个 → **交互式多选**（可多选）
4. 将选中项写入 project config 的 `registries[]`，形如：

   ```json
   {
     "repo": "https://github.com/weme-ui/weme-ui",
     "registry": "weme-ui/slim",
     "prefix": "weme"
   }
   ```

5. 物理 path 留在 manifest 侧供工具解析；用户后续用逻辑名引用（如 `weme-ui/slim/button`），不必接触 path

### 解析后续内容

对已登记的 `registry`：

1. 用 `repo` + 当前 ref 再取 `manifest.json`（是否缓存 path / digest 见开放问题）
2. 定位到 registry 根目录下的 `registry.json` 与 item 文件
3. 执行安装 / 更新，并维护 lockfile

## CLI 命令面

### 原则

1. **顶层留给消费路径**（高频、文档会写的命令）
2. **作者路径进入 `registry` 命名空间**
3. **一个命令对应一个清晰动作**；避免含义漂移的 `sync` / 根级 `build`
4. Item 引用统一为 `owner/registry/item`（项目已登记且无歧义时，可再讨论短名）

### 消费面（project）

| 命令              | 作用                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `init`            | 初始化项目：写 config；引导输入 repo URL → 读 manifest → 多选 registry；可处理 `on-init` items |
| `add <items…>`    | 显式安装注册项及其 `registryDependencies`                                                      |
| `update [items…]` | 按 lockfile 与源比对更新；无参则更新全部已装项                                                 |
| `remove <items…>` | 按 lockfile 撤出已装文件                                                                       |
| `list`            | 列出已登记 registry / 已装 item                                                                |
| `diff [items…]`   | 本地与 registry 源的差异（只读）                                                               |
| `info <item>`     | （可选）查看 item 元数据、依赖、目标路径                                                       |
| `doctor`          | （可选）校验 config、lockfile、路径别名等一致性                                                |

登记「项目依赖的注册源」可以：

- 收进 `init` / `add`（遇到未登记的 `owner/registry` 时再引导输入 repo URL），或
- 提供显式子命令，建议命名为 **`source`**，避免与作者面的 `registry` 混淆：

```text
weme-ui source add <repo-url>
weme-ui source remove <owner/registry>
weme-ui source list
```

`source add` 的核心输入是 **repo URL**，内部走 manifest 发现与多选，而不是让用户填写目录 path。

### 作者面（registry）

| 命令                   | 作用                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `registry init [name]` | 脚手架 registry 目录与初始 `registry.json`；可更新根目录 `manifest.json` 条目 |
| `registry build`       | 校验并写出 / 更新各 registry 的 `registry.json`，并维护根目录 `manifest.json` |
| `registry validate`    | 只校验不写                                                                    |
| `registry add <item>`  | （可选）脚手架单个 item 并登记进 catalog                                      |

说明：

- **不要**提供根级 `build`（易被理解成构建应用）
- `manifest.json` **不单独成命令**；由 `registry init` / `registry build` 维护
- `registry build` 以仓根 `manifest.json` 为索引扫描，**不强制** `registry/<name>` 目录结构
- 早期作者侧命令可以延后实现；catalog 允许手工维护

### 命令树（完整形态）

```text
weme-ui
├── init
├── add
├── update
├── remove
├── list
├── diff
├── info            # 可选
├── doctor          # 可选
├── source          # 可选；管理 project.registries
│   ├── add <repo-url>
│   ├── remove
│   └── list
└── registry        # 作者面
    ├── init
    ├── build
    ├── validate
    └── add         # 可选
```

### 全局约定（预留）

- `--cwd` / `--config`
- `--dry-run`
- `-y` / `--yes`（跳过交互中的确认；多选本身仍可能需要 TTY）

## 非目标

- 不规定 CLI 与本仓库 `scripts/` 的实现落点（另议）
- 不规定私有仓库鉴权细节
- 不规定 monorepo 发布 / schema JSON Schema 构建流程（仍属 `@weme-ui/schema` 等包职责）
- 不把 Zod → `*.schema.json` 的生成并入本 RFC 的 CLI 命令面

## 已决议

1. **强制 `manifest.json`**：远程发现不支持无 manifest 的隐式单项 registry。
2. **ref**：默认 `main`；仅支持 URL 内嵌 `/tree/<ref>`；不提供 `--ref`。

## 开放问题（待定）

3. **path 是否写入 project config / lockfile**：每次安装都重拉 manifest，还是把解析出的 path（或 content 摘要）缓存在 config / lockfile 以支持离线与可复现？
4. **短名解析**：在仅登记一个 registry、或存在 default 时，`add button` / `add slim/button` 是否允许？
5. **`source` 是否进第一版对外文档**：还是仅 `init` 登记；`add` 遇未登记时是报错还是引导输入 repo URL？

## 参考

- Schema 源码：`packages/schema/src/registry/manifest.ts`
- Schema 源码：`packages/schema/src/registry/schema.ts`
- Schema 源码：`packages/schema/src/project/schema.ts`
- Schema 源码：`packages/schema/src/project/lock-file.ts`
- 包：`packages/cli`（`@weme-ui/weme-ui`）
