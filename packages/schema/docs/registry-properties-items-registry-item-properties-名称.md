# 名称 Schema

```txt
undefined#/properties/items/items/properties/name
```

registry item 在所属 registry 内的唯一标识，必须为小写。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## name Type

`string` ([名称](registry-properties-items-registry-item-properties-名称.md))

## name Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## name Examples

```json
"button"
```

```json
"use-toggle"
```
