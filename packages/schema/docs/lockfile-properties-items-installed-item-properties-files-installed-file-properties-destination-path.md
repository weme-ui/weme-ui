# Destination path Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/dest
```

The path where this file was written in the project when the item was installed.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../../lockfile.schema.json "open original schema") |

## dest Type

`string` ([Destination path](lockfile-properties-items-installed-item-properties-files-installed-file-properties-destination-path.md))

## dest Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## dest Examples

```json
"src/components/ui/button/button.vue"
```

```json
"src/composables/use-toggle/index.ts"
```
