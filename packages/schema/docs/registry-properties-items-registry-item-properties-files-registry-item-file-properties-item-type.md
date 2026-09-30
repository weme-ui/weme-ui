# Item type Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/type
```

The category of the registry item. Determines how the item is classified and which default install path it uses when resolving files.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## type Type

`string` ([Item type](registry-properties-items-registry-item-properties-files-registry-item-file-properties-item-type.md))

## type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"component"`  |             |
| `"composable"` |             |
| `"ui"`         |             |
| `"block"`      |             |
| `"layout"`     |             |
| `"page"`       |             |
| `"util"`       |             |

## type Default Value

The default value is:

```json
"block"
```

## type Examples

```json
"component"
```

```json
"composable"
```

```json
"ui"
```

```json
"block"
```

```json
"layout"
```

```json
"page"
```

```json
"util"
```
