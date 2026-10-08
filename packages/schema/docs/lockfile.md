# 项目锁定文件 Schema

```txt
undefined
```

记录已安装进 Weme UI 项目的 registry items，包括来源 registry 以及磁盘上写入的具体文件。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                               |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [lockfile.schema.json](../../website/public/lockfile.schema.json "open original schema") |

## 项目锁定文件 Type

`object` ([项目锁定文件](lockfile.md))

## 项目锁定文件 Examples

```json
{
  "$schema": "https://weme-ui.github.io/weme-ui/lockfile.schema.json",
  "items": [
    {
      "registry": "weme-ui/slim",
      "prefix": "weme",
      "files": [
        {
          "source": "button/button.vue",
          "dest": "src/components/ui/button/button.vue"
        }
      ]
    }
  ]
}
```

# 项目锁定文件 Properties

| Property           | Type     | Required | Nullable       | Defined by                                                              |
| :----------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------- |
| [$schema](#schema) | `string` | Optional | cannot be null | [项目锁定文件](lockfile-properties-schema.md "undefined#/properties/$schema") |
| [items](#items)    | `array`  | Required | cannot be null | [项目锁定文件](lockfile-properties-items.md "undefined#/properties/items")    |

## $schema

用于校验该项目锁定文件的 JSON Schema URL。编辑器与工具链据此提供补全与校验。

`$schema`

* is optional

* Type: `string` ([Schema](lockfile-properties-schema.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](lockfile-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/lockfile.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/lockfile.schema.json"
```

## items

当前已安装进项目的 registry items。用于在更新时追踪来源与已安装文件位置。

`items`

* is required

* Type: `object[]` ([已安装 item](lockfile-properties-items-已安装-item.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items.md "undefined#/properties/items")

### items Type

`object[]` ([已安装 item](lockfile-properties-items-已安装-item.md))

### items Examples

```json
{
  "registry": "weme-ui/slim",
  "prefix": "weme",
  "files": [
    {
      "source": "button/button.vue",
      "dest": "src/components/ui/button/button.vue"
    }
  ]
}
```
