# 已安装 item Schema

```txt
undefined#/properties/items/items
```

已安装进项目的 registry item。记录来源 registry 以及实际写入的文件。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## items Type

`object` ([已安装 item](lockfile-properties-items-已安装-item.md))

## items Examples

```json
{
  "registry": "weme-ui/slim",
  "repo": "https://github.com/weme-ui/weme-ui",
  "prefix": "weme",
  "files": [
    {
      "source": "button/button.vue",
      "dest": "src/components/ui/button/button.vue"
    }
  ]
}
```

# items Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                  |
| :-------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [registry](#registry) | `string` | Required | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-registry.md "undefined#/properties/items/items/properties/registry") |
| [repo](#repo)         | `string` | Optional | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-仓库.md "undefined#/properties/items/items/properties/repo")           |
| [prefix](#prefix)     | `string` | Optional | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-前缀.md "undefined#/properties/items/items/properties/prefix")         |
| [files](#files)       | `array`  | Required | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件.md "undefined#/properties/items/items/properties/files")          |

## registry

该已安装 item 来源的 registry，形式为 "owner/registry"。

`registry`

* is required

* Type: `string` ([Registry](lockfile-properties-items-已安装-item-properties-registry.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-registry.md "undefined#/properties/items/items/properties/registry")

### registry Type

`string` ([Registry](lockfile-properties-items-已安装-item-properties-registry.md))

### registry Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^/]+\/[^/]+$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5E%2F%5D%2B%5C%2F%5B%5E%2F%5D%2B%24 "try regular expression with regexr.com")

### registry Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```

```json
"weme-ui/slim"
```

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```

## repo

安装该 item 时解析所得的 registry 源仓库。

`repo`

* is optional

* Type: `string` ([仓库](lockfile-properties-items-已安装-item-properties-仓库.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-仓库.md "undefined#/properties/items/items/properties/repo")

### repo Type

`string` ([仓库](lockfile-properties-items-已安装-item-properties-仓库.md))

### repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```

```json
"https://github.com/weme-ui/weme-ui"
```

## prefix

安装该 item 时应用的前缀，用于在同一项目存在多个 registry 时隔离文件命名空间。

`prefix`

* is optional

* Type: `string` ([前缀](lockfile-properties-items-已安装-item-properties-前缀.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-前缀.md "undefined#/properties/items/items/properties/prefix")

### prefix Type

`string` ([前缀](lockfile-properties-items-已安装-item-properties-前缀.md))

### prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### prefix Examples

```json
"weme"
```

```json
"weme"
```

## files

为该 item 写入项目的文件列表，每项含 registry 源路径与项目目标路径。

`files`

* is required

* Type: `object[]` ([已安装文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件.md "undefined#/properties/items/items/properties/files")

### files Type

`object[]` ([已安装文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件.md))

### files Examples

```json
{
  "source": "button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```
