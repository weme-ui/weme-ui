# 访问权限 Schema

```txt
undefined#/properties/access
```

控制谁可以访问该 registry。"public" 对所有人开放；"private" 需要授权。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## access Type

`string` ([访问权限](registry-properties-访问权限.md))

## access Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"public"`  |             |
| `"private"` |             |

## access Default Value

The default value is:

```json
"public"
```

## access Examples

```json
"public"
```

```json
"private"
```
