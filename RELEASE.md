# 发版

公开包共用一个版本号：`@weme-ui/colors`、`@weme-ui/schema`、`@weme-ui/utilities`、`@weme-ui/unocss-preset`、`@weme-ui/weme-ui`。

功能改动直接进 `main`，不会发包。只有 `v*` tag 会启动 Release workflow：检查版本和 changelog，跑 lint、typecheck、test，发布到 npm，再创建 GitHub Release。

`bun run bump` 要在你自己的终端里执行。它会询问确认，然后改版本、写 changelog、提交、打 tag，并推送当前分支和全部 tag。脚本不接受 `--yes`。

## 你来做

1. 把要发布的改动先提交并推到 `main`。发版时工作区必须是干净的，当前分支必须是最新的 `main`。bumpp 会把当时的全部改动放进同一次 `release:` 提交。
2. 在仓库根目录执行下面其中一条。终端里出现确认时再同意。

   现在各包版本还不一致，而且 `@weme-ui/schema` 已经发布过 `5.0.1`。第一次只能用显式版本，并且要高于 `5.0.1`：

   ```bash
   bun run bump 6.0.0
   ```

   对齐之后：

   ```bash
   bun run bump patch
   bun run bump 6.1.0
   bun run bump 6.0.1-beta.0
   ```

   `patch`、`minor`、`major` 在对齐之前会被拒绝。预发布版本发布到对应的 preid，例如 `beta`。正式版发布到 `latest`。

3. 确认之后，这条命令会把根目录和五个公开包写成同一个版本，刷新 `bun.lock`，用 changelogen 写下根目录 `CHANGELOG.md`，并把这一章同步到五个包的 changelog 顶部，然后提交 `release: vX.Y.Z`、打 annotated tag `vX.Y.Z`，再 `git push` 和 `git push --tags`。
4. 打开 GitHub Actions 里的 Release。tag 对应的版本必须和六个 `package.json` 一致，根目录 `CHANGELOG.md` 里也要有 `## vX.Y.Z`。

changelog 从当前提交能追溯到的最近一个 tag 写起。现在这个 tag 是 `@weme-ui/unocss-preset@0.8.2`，所以第一次的 `## v6.0.0` 只包含它之后的 commit。`6.0.0` 之前的记录仍在各包的 `CHANGELOG.md`。进入 changelog 的类型是 `feat`、`fix`、`perf`、`refactor`、`docs`、`types`。

本地不要运行 `bun run release`，它只在 GitHub Actions 里发布。也不要直接运行 `bunx bumpp`，那会跳过版本检查。

## 交给 Agent

Agent 负责发版前的准备和发版后的排查。版本提交、tag 和推送留在你的终端里。

功能做完、还没发版时，可以这样说：

```text
做完这次改动，跑 lint、lint:fix、typecheck、format，并提交推到 main。
不要打 v* tag，不要运行 bun run bump、bunx bumpp 或 bun run release。
```

准备发版时：

```text
按 RELEASE.md 做发版前检查。不要执行 bun run bump，不要打 tag，不要 push。
确认当前在 main、已和 origin/main 同步、工作区干净，并且 lint、typecheck、format 通过。
告诉我该用的命令，changelog 从哪个 tag 写起，以及会包含哪些 commit。
```

tag 推上去之后：

```text
看 weme-ui/weme-ui 上 tag v6.0.0 的 Release workflow。
失败的话只查原因。不要重打 tag，不要删除或移动 tag。
```

把 `v6.0.0` 换成实际 tag。npm 上某个包的版本已经存在时，workflow 会跳过该包；其它错误会让这次发布失败。

## 一次性的权限

五个包的 [Trusted Publisher](https://docs.npmjs.com/trusted-publishers) 需要继续指向 `.github/workflows/release.yml`。这项在 npm 上确认，仓库里看不出来。

给 `v*` 加 tag ruleset：只允许维护者推送，并且禁止移动或删除 tag。
