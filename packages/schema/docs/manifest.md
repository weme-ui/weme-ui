# Registry manifest Schema

```txt
undefined
```

仓库或 workspace 中可用 registry 的索引。将每个 registry 名称映射到包含其配置与 items 的目录。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                               |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [manifest.schema.json](../../website/public/manifest.schema.json "open original schema") |

## Registry manifest Type

`object` ([Registry manifest](manifest.md))

## Registry manifest Examples

```json
{
  "$schema": "https://weme-ui.github.io/weme-ui/manifest.schema.json",
  "registries": {
    "weme-ui/core": "registry/core",
    "weme-ui/slim": "registry/slim"
  }
}
```

# Registry manifest Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                |
| :------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------- |
| [$schema](#schema)        | `string` | Optional | cannot be null | [Registry manifest](manifest-properties-schema.md "undefined#/properties/$schema")        |
| [registries](#registries) | `object` | Required | cannot be null | [Registry manifest](manifest-properties-registries.md "undefined#/properties/registries") |

## $schema

用于校验该 registry manifest 的 JSON Schema URL。编辑器与工具链据此提供补全与校验。

`$schema`

* is optional

* Type: `string` ([Schema](manifest-properties-schema.md))

* cannot be null

* defined in: [Registry manifest](manifest-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](manifest-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/manifest.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/manifest.schema.json"
```

## registries

已注册 registry 名称到磁盘目录路径的映射。键为 "owner/registry" 形式；值为各 registry 根目录的相对或绝对路径。

`registries`

* is required

* Type: `object` ([Registries](manifest-properties-registries.md))

* cannot be null

* defined in: [Registry manifest](manifest-properties-registries.md "undefined#/properties/registries")

### registries Type

`object` ([Registries](manifest-properties-registries.md))

### registries Examples

```json
{
  "weme-ui/core": "registry/core",
  "weme-ui/slim": "registry/slim"
}
```
