# Source path Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/source
```

The original path of the file inside the registry package, relative to the registry root.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## source Type

`string` ([Source path](lockfile-properties-items-installed-item-properties-files-installed-file-properties-source-path.md))

## source Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## source Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```
