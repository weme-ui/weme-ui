# 注册项类型 Schema

```txt
undefined#/properties/items/items/properties/type
```

registry item 的分类。决定如何归类该 item，以及解析文件时使用哪条默认安装路径。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## type Type

`string` ([注册项类型](lockfile-properties-items-已安装-item-properties-注册项类型.md))

## type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"component"`  |             |
| `"composable"` |             |
| `"block"`      |             |
| `"layout"`     |             |
| `"page"`       |             |
| `"util"`       |             |
| `"theme"`      |             |

## type Default Value

The default value is:

```json
"component"
```

## type Examples

```json
"component"
```

```json
"composable"
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
"theme"
```
