# @weme-ui/schema

## 4.1.0

### Minor Changes

- [`7d26ebe`](https://github.com/weme-ui/weme-ui/commit/7d26ebe84817dde9cd1595b60ac5562b516be38f) Thanks [@moujinet](https://github.com/moujinet)! - 锁定文件为已安装 item 增加必填 `name`，并为已安装文件增加可选 `kind`（file / doc / example / test）。

## 4.0.0

### Major Changes

- 从独立仓库迁入 weme-ui monorepo，校验库从 Zod 换成 Valibot。这是破坏性更新，不再兼容 3.x 的 Zod schema 导出。
