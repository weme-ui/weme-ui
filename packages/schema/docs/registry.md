# Registry 配置 Schema

```txt
undefined
```

Weme UI registry 的配置。声明标识、访问权限、默认安装路径，以及对外暴露的 items。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                               |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [registry.schema.json](../../website/public/registry.schema.json "open original schema") |

## Registry 配置 Type

`object` ([Registry 配置](registry.md))

## Registry 配置 Examples

```json
{
  "name": "weme-ui/slim",
  "access": "public",
  "defaultPaths": {
    "component": "~/components"
  },
  "items": [
    {
      "name": "button",
      "title": "Button",
      "files": [
        {
          "path": "button/button.vue"
        }
      ]
    }
  ]
}
```

# Registry 配置 Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                         |
| :---------------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------- |
| [$schema](#schema)                  | `string` | Optional | cannot be null | [Registry 配置](registry-properties-schema.md "undefined#/properties/$schema")       |
| [name](#name)                       | `string` | Required | cannot be null | [Registry 配置](registry-properties-registry-名称.md "undefined#/properties/name")     |
| [description](#description)         | `string` | Optional | cannot be null | [Registry 配置](registry-properties-描述.md "undefined#/properties/description")       |
| [version](#version)                 | `string` | Optional | cannot be null | [Registry 配置](registry-properties-版本.md "undefined#/properties/version")           |
| [homepage](#homepage)               | `string` | Optional | cannot be null | [Registry 配置](registry-properties-主页.md "undefined#/properties/homepage")          |
| [repository](#repository)           | `string` | Optional | cannot be null | [Registry 配置](registry-properties-仓库.md "undefined#/properties/repository")        |
| [issues](#issues)                   | `string` | Optional | cannot be null | [Registry 配置](registry-properties-issues.md "undefined#/properties/issues")        |
| [contributors](#contributors)       | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-贡献者.md "undefined#/properties/contributors")     |
| [access](#access)                   | `string` | Optional | cannot be null | [Registry 配置](registry-properties-访问权限.md "undefined#/properties/access")          |
| [dependencies](#dependencies)       | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-依赖.md "undefined#/properties/dependencies")      |
| [devDependencies](#devdependencies) | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-开发依赖.md "undefined#/properties/devDependencies") |
| [items](#items)                     | `array`  | Required | cannot be null | [Registry 配置](registry-properties-items.md "undefined#/properties/items")          |
| [exclude](#exclude)                 | `array`  | Optional | cannot be null | [Registry 配置](registry-properties-排除.md "undefined#/properties/exclude")           |
| [defaultPaths](#defaultpaths)       | `object` | Optional | cannot be null | [Registry 配置](registry-properties-路径.md "undefined#/properties/defaultPaths")      |

## $schema

用于校验该 registry 配置的 JSON Schema URL。编辑器与工具链据此提供补全与校验。

`$schema`

* is optional

* Type: `string` ([Schema](registry-properties-schema.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](registry-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```

## name

registry 的唯一名称，形式为 "owner/registry"。用于在生态中标识并解析该 registry。

`name`

* is required

* Type: `string` ([Registry 名称](registry-properties-registry-名称.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-registry-名称.md "undefined#/properties/name")

### name Type

`string` ([Registry 名称](registry-properties-registry-名称.md))

### name Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^/]+\/[^/]+$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5E%2F%5D%2B%5C%2F%5B%5E%2F%5D%2B%24 "try regular expression with regexr.com")

### name Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```

## description

对该 registry 内容与用途的简短说明。

`description`

* is optional

* Type: `string` ([描述](registry-properties-描述.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-描述.md "undefined#/properties/description")

### description Type

`string` ([描述](registry-properties-描述.md))

### description Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### description Examples

```json
"Weme UI 的 slim registry"
```

## version

该 registry 的版本。建议使用兼容 semver 的字符串，便于消费方判断升级。

`version`

* is optional

* Type: `string` ([版本](registry-properties-版本.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-版本.md "undefined#/properties/version")

### version Type

`string` ([版本](registry-properties-版本.md))

### version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### version Examples

```json
"1.0.0"
```

```json
"2.1.3"
```

## homepage

该 registry 所属项目的主页 URL。

`homepage`

* is optional

* Type: `string` ([主页](registry-properties-主页.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-主页.md "undefined#/properties/homepage")

### homepage Type

`string` ([主页](registry-properties-主页.md))

### homepage Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### homepage Examples

```json
"https://weme-ui.com"
```

## repository

该 registry 源代码仓库的 URL。

`repository`

* is optional

* Type: `string` ([仓库](registry-properties-仓库.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-仓库.md "undefined#/properties/repository")

### repository Type

`string` ([仓库](registry-properties-仓库.md))

### repository Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### repository Examples

```json
"https://github.com/weme-ui/weme-ui"
```

## issues

用于反馈该 registry 问题的 issue 跟踪地址。

`issues`

* is optional

* Type: `string` ([Issues](registry-properties-issues.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-issues.md "undefined#/properties/issues")

### issues Type

`string` ([Issues](registry-properties-issues.md))

### issues Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### issues Examples

```json
"https://github.com/weme-ui/weme-ui/issues"
```

## contributors

参与该 registry 的贡献者列表。通常为姓名，可选附带邮箱。

`contributors`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-贡献者.md "undefined#/properties/contributors")

### contributors Type

`string[]`

### contributors Examples

```json
"Luo Yi <luoyi@mouji.com>"
```

## access

控制谁可以访问该 registry。"public" 对所有人开放；"private" 需要授权。

`access`

* is optional

* Type: `string` ([访问权限](registry-properties-访问权限.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-访问权限.md "undefined#/properties/access")

### access Type

`string` ([访问权限](registry-properties-访问权限.md))

### access Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"public"`  |             |
| `"private"` |             |

### access Default Value

The default value is:

```json
"public"
```

### access Examples

```json
"public"
```

```json
"private"
```

## dependencies

以该 registry 初始化消费方项目时默认安装的运行时 NPM 包。与 item 级依赖不同，这些依赖对整个 registry 只应用一次。条目可带版本范围或 tag，例如 "vue^3.4.0" 或 "lodash\@latest"。

`dependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-依赖.md "undefined#/properties/dependencies")

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

以该 registry 初始化消费方项目时默认安装的开发用 NPM 包。适用于 registry 共享的工具链（例如测试辅助），而非应用运行时所需的包。条目可带版本范围或 tag。

`devDependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-开发依赖.md "undefined#/properties/devDependencies")

### devDependencies Type

`string[]`

### devDependencies Examples

```json
"vitest^2.0.0"
```

```json
"@vue/test-utils@latest"
```

## items

该 registry 发布的 item 目录。每个 item 描述一个可安装单元，例如 component、block 或工具。

`items`

* is required

* Type: `object[]` ([Registry item](registry-properties-items-registry-item.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items.md "undefined#/properties/items")

### items Type

`object[]` ([Registry item](registry-properties-items-registry-item.md))

### items Examples

```json
{
  "name": "button",
  "title": "Button",
  "description": "按钮 component"
}
```

## exclude

在解析或安装时忽略的 registry item 名称列表。适合临时隐藏未完成或已弃用的 item。

`exclude`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry 配置](registry-properties-排除.md "undefined#/properties/exclude")

### exclude Type

`string[]`

### exclude Examples

```json
"button"
```

```json
"legacy-card"
```

## defaultPaths

将 registry item 类型映射到安装目标路径。用 "\*" 作为未显式配置类型的兜底。路径可使用别名，例如 "\~/components"。

`defaultPaths`

* is optional

* Type: `object` ([路径](registry-properties-路径.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-路径.md "undefined#/properties/defaultPaths")

### defaultPaths Type

`object` ([路径](registry-properties-路径.md))

### defaultPaths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```
