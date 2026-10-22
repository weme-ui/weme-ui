# Changesets

本仓库用 [Changesets](https://github.com/changesets/changesets) 给 `@weme-ui/schema` 和 `@weme-ui/unocss-preset` 做独立版本号。

改了其中一个可发版包后，在仓库根目录执行：

```bash
bun run changeset
```

合并到 `main` 后，Release workflow 会开 Version PR；再合并该 PR 就会把对应包装到 npm。
