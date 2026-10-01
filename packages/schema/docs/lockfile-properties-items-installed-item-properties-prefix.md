# Prefix Schema

```txt
undefined#/properties/items/items/properties/prefix
```

The install prefix that was applied to this item, used to namespace files when multiple registries are present in the same project.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../../docs/lockfile.schema.json "open original schema") |

## prefix Type

`string` ([Prefix](lockfile-properties-items-installed-item-properties-prefix.md))

## prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## prefix Examples

```json
"weme"
```
