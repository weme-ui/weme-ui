# Repository Schema

```txt
undefined#/properties/registries/items/properties/repo
```

The source repository that hosts the registry. Used to resolve and fetch registry contents when the registry is not already available locally.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../../config.schema.json "open original schema") |

## repo Type

`string` ([Repository](config-properties-registries-registered-registry-properties-repository.md))

## repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```
