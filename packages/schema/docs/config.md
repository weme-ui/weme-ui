# 项目配置 Schema

```txt
undefined
```

Weme UI 项目配置。声明安装路径、已注册的 registries，以及可选的 UnoCSS 主题扩展。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json](../../website/public/config.schema.json "open original schema") |

## 项目配置 Type

`object` ([项目配置](config.md))

## 项目配置 Examples

```json
{
  "paths": {
    "component": "~/components",
    "ui": "~/components/ui"
  },
  "registries": [
    {
      "registry": "weme-ui/slim",
      "prefix": "weme"
    }
  ]
}
```

# 项目配置 Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                 |
| :------------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------- |
| [$schema](#schema)        | `string` | Optional | cannot be null | [项目配置](config-properties-schema.md "undefined#/properties/$schema")        |
| [paths](#paths)           | `object` | Optional | cannot be null | [项目配置](config-properties-路径.md "undefined#/properties/paths")              |
| [registries](#registries) | `array`  | Optional | cannot be null | [项目配置](config-properties-registries.md "undefined#/properties/registries") |
| [unocss](#unocss)         | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展.md "undefined#/properties/unocss")      |

## $schema

用于校验该项目配置的 JSON Schema URL。编辑器与工具链据此提供补全与校验。

`$schema`

* is optional

* Type: `string` ([Schema](config-properties-schema.md))

* cannot be null

* defined in: [项目配置](config-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](config-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/config.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/config.schema.json"
```

## paths

将 registry item 类型映射到安装目标路径。用 "\*" 作为未显式配置类型的兜底。路径可使用别名，例如 "\~/components"。

`paths`

* is optional

* Type: `object` ([路径](config-properties-路径.md))

* cannot be null

* defined in: [项目配置](config-properties-路径.md "undefined#/properties/paths")

### paths Type

`object` ([路径](config-properties-路径.md))

### paths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```

## registries

已向本项目注册的 registries。每项选择一个 registry，并可指定仓库来源与安装前缀。

`registries`

* is optional

* Type: `object[]` ([已注册的 Registry](config-properties-registries-已注册的-registry.md))

* cannot be null

* defined in: [项目配置](config-properties-registries.md "undefined#/properties/registries")

### registries Type

`object[]` ([已注册的 Registry](config-properties-registries-已注册的-registry.md))

### registries Examples

```json
{
  "repo": "https://github.com/weme-ui/weme-ui",
  "registry": "weme-ui/slim",
  "prefix": "weme"
}
```

## unocss

项目级 UnoCSS 主题扩展。用于自定义强调色、中性色，以及注入 UnoCSS preset 的额外 CSS 变量。

`unocss`

* is optional

* Type: `object` ([UnoCSS 扩展](config-properties-unocss-扩展.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展.md "undefined#/properties/unocss")

### unocss Type

`object` ([UnoCSS 扩展](config-properties-unocss-扩展.md))
