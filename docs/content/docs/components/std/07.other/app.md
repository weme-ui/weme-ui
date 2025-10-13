---
description: 包装你的应用以提供全局配置等功能。

links:
  - label: Other
    icon: lucide:ellipsis
  - label: Config Provider
    icon: lucide:component
    to: https://reka-ui.com/docs/utilities/config-provider
    target: _blank
  - label: Source
    icon: lucide:code
    to: https://github.com/weme-ui/weme-ui/tree/main/registry/std/components/app
    target: _blank
---

## 安装

```shell [Terminal]
$ pnpm dlx @weme-ui/weme-ui add app
```

## API

### 属性

::props-table
---
data:
  - name: tooltip
    type:
      - TooltipProviderProps
    description: 工具提示属性
  - name: toaster
    type:
      - ToastProviderProps
    description: 通知提示属性
---
::
