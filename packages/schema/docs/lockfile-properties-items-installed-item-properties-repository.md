# Repository Schema

```txt
undefined#/properties/items/items/properties/repo
```

The source repository the registry was resolved from when this item was installed.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../../lockfile.schema.json "open original schema") |

## repo Type

`string` ([Repository](lockfile-properties-items-installed-item-properties-repository.md))

## repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```
