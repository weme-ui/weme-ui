# Target path Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/target
```

The destination path where this file should be written when the item is installed. If omitted, the path is derived from the registry default paths and the item type.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../docs/registry.schema.json "open original schema") |

## target Type

`string` ([Target path](registry-properties-items-registry-item-properties-files-registry-item-file-properties-target-path.md))

## target Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## target Examples

```json
"components/ui/button.vue"
```
