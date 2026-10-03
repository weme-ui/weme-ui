# Guide

## 安装

```bash
pnpm dlx @weme-ui/weme-ui init
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/button
```

## 约定

- 组件源码、文档与示例共存于同一个 item 目录。
- 文档站通过 alias 直接读取 registry 源码，无需把组件库安装为 npm 依赖。
