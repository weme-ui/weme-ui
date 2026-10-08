# 已注册的 Registry Schema

```txt
undefined#/properties/registries/items
```

已向项目注册的 registry。指明使用哪个 registry，以及可选的拉取来源与安装前缀。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## items Type

`object` ([已注册的 Registry](config-properties-registries-已注册的-registry.md))

## items Examples

```json
{
  "repo": "https://github.com/weme-ui/weme-ui",
  "registry": "weme-ui/slim",
  "prefix": "weme"
}
```

# items Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                             |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| [repo](#repo)         | `string` | Optional | cannot be null | [项目配置](config-properties-registries-已注册的-registry-properties-仓库.md "undefined#/properties/registries/items/properties/repo")           |
| [registry](#registry) | `string` | Required | cannot be null | [项目配置](config-properties-registries-已注册的-registry-properties-registry.md "undefined#/properties/registries/items/properties/registry") |
| [prefix](#prefix)     | `string` | Optional | cannot be null | [项目配置](config-properties-registries-已注册的-registry-properties-前缀.md "undefined#/properties/registries/items/properties/prefix")         |

## repo

托管该 registry 的源仓库。当 registry 本地尚不可用时，用于解析并拉取内容。

`repo`

* is optional

* Type: `string` ([仓库](config-properties-registries-已注册的-registry-properties-仓库.md))

* cannot be null

* defined in: [项目配置](config-properties-registries-已注册的-registry-properties-仓库.md "undefined#/properties/registries/items/properties/repo")

### repo Type

`string` ([仓库](config-properties-registries-已注册的-registry-properties-仓库.md))

### repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```

## registry

向本项目注册的 registry，形式为 "owner/registry"。

`registry`

* is required

* Type: `string` ([Registry](config-properties-registries-已注册的-registry-properties-registry.md))

* cannot be null

* defined in: [项目配置](config-properties-registries-已注册的-registry-properties-registry.md "undefined#/properties/registries/items/properties/registry")

### registry Type

`string` ([Registry](config-properties-registries-已注册的-registry-properties-registry.md))

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

## prefix

可选的安装前缀，用于为该 registry 的 items 做命名空间隔离，避免同一项目注册多个 registry 时发生冲突。

`prefix`

* is optional

* Type: `string` ([前缀](config-properties-registries-已注册的-registry-properties-前缀.md))

* cannot be null

* defined in: [项目配置](config-properties-registries-已注册的-registry-properties-前缀.md "undefined#/properties/registries/items/properties/prefix")

### prefix Type

`string` ([前缀](config-properties-registries-已注册的-registry-properties-前缀.md))

### prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### prefix Examples

```json
"weme"
```
