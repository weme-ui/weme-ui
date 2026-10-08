# 文件种类 Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/kind
```

文件在 registry item 中的角色。"file" 为主源码；"doc"、"example"、"test" 分别标记配套文档、示例与测试。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## kind Type

`string` ([文件种类](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-文件种类.md))

## kind Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"file"`    |             |
| `"doc"`     |             |
| `"example"` |             |
| `"test"`    |             |

## kind Default Value

The default value is:

```json
"file"
```

## kind Examples

```json
"file"
```

```json
"doc"
```

```json
"example"
```

```json
"test"
```
