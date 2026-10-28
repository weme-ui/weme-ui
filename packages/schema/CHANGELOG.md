# @weme-ui/schema

## 5.0.0

### Major Changes

- [`b519185`](https://github.com/weme-ui/weme-ui/commit/b5191852fb0ddd0b24153495b55f998b2c3ae4f1) Thanks [@moujinet](https://github.com/moujinet)! - 项目配置将 `cssVars` 收进 `unocss`，颜色改为 `unocss.colors.accent` / `unocss.colors.neutral`；路径别名从 `*` 改为 `~`。省略的 registry item `type` 默认改为 `component`，锁定文件已安装 item 增加可选 `type`。

## 4.1.0

### Minor Changes

- [`7d26ebe`](https://github.com/weme-ui/weme-ui/commit/7d26ebe84817dde9cd1595b60ac5562b516be38f) Thanks [@moujinet](https://github.com/moujinet)! - 锁定文件为已安装 item 增加必填 `name`，并为已安装文件增加可选 `kind`（file / doc / example / test）。

## 4.0.0

### Major Changes

- 从独立仓库迁入 weme-ui monorepo，校验库从 Zod 换成 Valibot。这是破坏性更新，不再兼容 3.x 的 Zod schema 导出。
