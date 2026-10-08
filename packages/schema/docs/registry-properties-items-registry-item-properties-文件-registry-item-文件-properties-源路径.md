# 源路径 Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/path
```

文件在 registry 包内的路径，相对于 registry 根目录。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## path Type

`string` ([源路径](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-源路径.md))

## path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## path Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```
