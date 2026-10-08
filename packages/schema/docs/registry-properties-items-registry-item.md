# Registry item Schema

```txt
undefined#/properties/items/items
```

registry 中的一个可安装单元。描述标识、类型、文件、CSS 变量，以及 NPM 与 registry 级依赖。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## items Type

`object` ([Registry item](registry-properties-items-registry-item.md))

## items Examples

```json
{
  "name": "button",
  "title": "Button",
  "description": "支持多种变体的通用按钮 component。",
  "type": "component",
  "files": [
    {
      "path": "button/button.vue"
    }
  ],
  "registryDependencies": [
    "utils"
  ],
  "meta": {
    "docs.category": "actions",
    "docs.categoryLabel": "Actions"
  }
}
```

# items Properties

| Property                                      | Type     | Required | Nullable       | Defined by                                                                                                                                           |
| :-------------------------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)                                 | `string` | Required | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-名称.md "undefined#/properties/items/items/properties/name")                          |
| [title](#title)                               | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-显示名称.md "undefined#/properties/items/items/properties/title")                       |
| [description](#description)                   | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-描述.md "undefined#/properties/items/items/properties/description")                   |
| [type](#type)                                 | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-类型.md "undefined#/properties/items/items/properties/type")                          |
| [when](#when)                                 | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-安装时机.md "undefined#/properties/items/items/properties/when")                        |
| [files](#files)                               | `array`  | Required | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-文件.md "undefined#/properties/items/items/properties/files")                         |
| [cssVars](#cssvars)                           | `object` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-css-变量.md "undefined#/properties/items/items/properties/cssVars")                   |
| [dependencies](#dependencies)                 | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-依赖.md "undefined#/properties/items/items/properties/dependencies")                  |
| [devDependencies](#devdependencies)           | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-开发依赖.md "undefined#/properties/items/items/properties/devDependencies")             |
| [registryDependencies](#registrydependencies) | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-registry-依赖.md "undefined#/properties/items/items/properties/registryDependencies") |
| [meta](#meta)                                 | `object` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-元数据.md "undefined#/properties/items/items/properties/meta")                         |

## name

registry item 在所属 registry 内的唯一标识，必须为小写。

`name`

* is required

* Type: `string` ([名称](registry-properties-items-registry-item-properties-名称.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-名称.md "undefined#/properties/items/items/properties/name")

### name Type

`string` ([名称](registry-properties-items-registry-item-properties-名称.md))

### name Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### name Examples

```json
"button"
```

```json
"use-toggle"
```

## title

用于界面与文档展示的友好名称；省略时回退为 name。

`title`

* is optional

* Type: `string` ([显示名称](registry-properties-items-registry-item-properties-显示名称.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-显示名称.md "undefined#/properties/items/items/properties/title")

### title Type

`string` ([显示名称](registry-properties-items-registry-item-properties-显示名称.md))

### title Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### title Examples

```json
"Button"
```

```json
"Use Toggle"
```

## description

对该 registry item 能力的简短说明，便于发现与文档展示。

`description`

* is optional

* Type: `string` ([描述](registry-properties-items-registry-item-properties-描述.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-描述.md "undefined#/properties/items/items/properties/description")

### description Type

`string` ([描述](registry-properties-items-registry-item-properties-描述.md))

### description Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### description Examples

```json
"支持多种变体的通用按钮 component。"
```

## type

该 registry item 的分类。省略时默认为 "block"。用于归类，并选择对应的默认安装路径。

`type`

* is optional

* Type: `string` ([类型](registry-properties-items-registry-item-properties-类型.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-类型.md "undefined#/properties/items/items/properties/type")

### type Type

`string` ([类型](registry-properties-items-registry-item-properties-类型.md))

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"component"`  |             |
| `"composable"` |             |
| `"ui"`         |             |
| `"block"`      |             |
| `"layout"`     |             |
| `"page"`       |             |
| `"util"`       |             |

### type Default Value

The default value is:

```json
"block"
```

### type Examples

```json
"component"
```

```json
"composable"
```

```json
"ui"
```

```json
"block"
```

```json
"layout"
```

```json
"page"
```

```json
"util"
```

```json
"block"
```

```json
"component"
```

```json
"composable"
```

```json
"ui"
```

```json
"layout"
```

```json
"page"
```

```json
"util"
```

## when

控制被动（自动）安装时该 item 何时被安装。"on-init" 表示 registry 初始化后立即安装；"on-depended" 表示仅在其他 item 依赖它时才安装。显式安装不受影响。

`when`

* is optional

* Type: `string` ([安装时机](registry-properties-items-registry-item-properties-安装时机.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-安装时机.md "undefined#/properties/items/items/properties/when")

### when Type

`string` ([安装时机](registry-properties-items-registry-item-properties-安装时机.md))

### when Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | :---------- |
| `"on-init"`     |             |
| `"on-depended"` |             |

### when Default Value

The default value is:

```json
"on-depended"
```

### when Examples

```json
"on-init"
```

```json
"on-depended"
```

```json
"on-init"
```

```json
"on-depended"
```

## files

构成该 registry item 的文件列表。至少应列出主要源文件。

`files`

* is required

* Type: `object[]` ([Registry item 文件](registry-properties-items-registry-item-properties-文件-registry-item-文件.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-文件.md "undefined#/properties/items/items/properties/files")

### files Type

`object[]` ([Registry item 文件](registry-properties-items-registry-item-properties-文件-registry-item-文件.md))

### files Examples

```json
{
  "path": "button/button.vue"
}
```

## cssVars

安装该 item 时注入的 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。

`cssVars`

* is optional

* Type: `object` ([CSS 变量](registry-properties-items-registry-item-properties-css-变量.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-css-变量.md "undefined#/properties/items/items/properties/cssVars")

### cssVars Type

`object` ([CSS 变量](registry-properties-items-registry-item-properties-css-变量.md))

### cssVars Examples

```json
{
  "theme": {
    "color-primary": "oklch(0.55 0.2 250)"
  }
}
```

```json
{
  "theme": {
    "color-primary": "oklch(0.55 0.2 250)"
  }
}
```

## dependencies

该 item 运行时所需的 NPM 包。条目可带版本范围或 tag，例如 "vue^3.0.0" 或 "lodash\@latest"。

`dependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-依赖.md "undefined#/properties/items/items/properties/dependencies")

### dependencies Type

`string[]`

### dependencies Examples

```json
"vue^3.4.0"
```

```json
"class-variance-authority@latest"
```

## devDependencies

仅用于开发或测试该 item 的 NPM 包，生产环境不需要。

`devDependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-开发依赖.md "undefined#/properties/items/items/properties/devDependencies")

### devDependencies Type

`string[]`

### devDependencies Examples

```json
"vitest^2.0.0"
```

```json
"@vue/test-utils@latest"
```

## registryDependencies

必须与该 item 一并安装的其他 registry item。按同一或已解析 registry 内的 item 名称引用。

`registryDependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-registry-依赖.md "undefined#/properties/items/items/properties/registryDependencies")

### registryDependencies Type

`string[]`

### registryDependencies Examples

```json
"button"
```

```json
"utils"
```

## meta

供工具链与文档使用的任意键值元数据。文档展示字段使用 "docs.\*" 命名空间，例如 "docs.category" 与 "docs.categoryLabel"。

`meta`

* is optional

* Type: `object` ([元数据](registry-properties-items-registry-item-properties-元数据.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-元数据.md "undefined#/properties/items/items/properties/meta")

### meta Type

`object` ([元数据](registry-properties-items-registry-item-properties-元数据.md))

### meta Examples

```json
{
  "docs.category": "actions",
  "docs.categoryLabel": "Actions"
}
```
