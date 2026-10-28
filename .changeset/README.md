# Changesets

本仓库用 [Changesets](https://github.com/changesets/changesets) 给 `@weme-ui/schema`、`@weme-ui/unocss-preset` 和 `@weme-ui/weme-ui` 做独立版本号。

## 本地

改了其中一个可发版包后，在仓库根目录执行：

```bash
bun run changeset
```

不要手改这些包的 `version` 或 `CHANGELOG.md`。

## CI

推到 `main` 后，[Release](../.github/workflows/release.yml) workflow 会二选一：

1. 还有未消费的 changeset → 开或更新 Version PR（`changeset-release/main`）
2. 合并 Version PR 后 → 构建、用 npm Trusted Publishing 发包，并创建 GitHub Release

仓库需要打开 **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests**。每个要发的 npm 包还需要把这个 GitHub repo 配成 [Trusted Publisher](https://docs.npmjs.com/trusted-publishers)。
