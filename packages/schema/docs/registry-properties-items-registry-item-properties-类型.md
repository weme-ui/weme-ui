# 类型 Schema

```txt
undefined#/properties/items/items/properties/type
```

该 registry item 的分类。省略时默认为 "block"。用于归类，并选择对应的默认安装路径。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## type Type

`string` ([类型](registry-properties-items-registry-item-properties-类型.md))

## type Constraints

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

## type Default Value

The default value is:

```json
"block"
```

## type Examples

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
