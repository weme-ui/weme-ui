# Type Schema

```txt
undefined#/properties/items/items/properties/type
```

The category of this registry item. Defaults to "block" when omitted. Used for classification and to select the matching default install path.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## type Type

`string` ([Type](registry-properties-items-registry-item-properties-type.md))

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
"block"
```

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
"layout"
```

```json
"page"
```

```json
"util"
```
