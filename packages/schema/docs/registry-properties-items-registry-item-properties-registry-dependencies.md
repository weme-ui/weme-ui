# Registry dependencies Schema

```txt
undefined#/properties/items/items/properties/registryDependencies
```

Other registry items that must be installed alongside this one. Referenced by item name within the same or a resolved registry.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## registryDependencies Type

`string[]`

## registryDependencies Examples

```json
"button"
```

```json
"utils"
```
