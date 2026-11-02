<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" alt="Weme UI" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">Website</sup>
  </h1>
</p>

<p align="center">
  CLI 落地页，并渲染 <code>@weme-ui/unocss-preset</code> 的基础文档。JSON Schema 只托管，不在页面上展示。
</p>

<p align="center">
  ⚠️ Do not use in production. This project is still in early development.
</p>

## 职责

1. 构建 CLI 落地页。
2. 渲染 `packages/unocss-preset/docs`，路径为 `/docs/unocss-preset/`。文档源文件留在 Preset 包内。
3. 把 `public/*.schema.json` 发布到 GitHub Pages：
   - `https://weme-ui.github.io/weme-ui/config.schema.json`
   - `https://weme-ui.github.io/weme-ui/lockfile.schema.json`
   - `https://weme-ui.github.io/weme-ui/registry.schema.json`

组件库在 [weme-ui/slim](https://github.com/weme-ui/slim)。CLI 文档以后放在 `/docs/cli/`，这次不包含。

Schema 源文件由 `@weme-ui/schema` 的 `build:docs` 写入 `public/`。构建产物输出到仓库根目录 `docs/`，用于 GitHub Pages。

## 命令

```bash
bun --filter @weme-ui/website dev
bun --filter @weme-ui/website build:docs
bun --filter @weme-ui/website preview
bun --filter @weme-ui/website typecheck
```

开发服务器默认地址：`http://localhost:4321/weme-ui/`。

## 许可证

[MIT](https://github.com/weme-ui/weme-ui/blob/main/LICENSE) License © 2025 [weme-ui](https://github.com/weme-ui/weme-ui)
