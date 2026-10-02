# Source path Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/path
```

The path to the file within the registry package. Relative to the registry root.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## path Type

`string` ([Source path](registry-properties-items-registry-item-properties-files-registry-item-file-properties-source-path.md))

## path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## path Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```
