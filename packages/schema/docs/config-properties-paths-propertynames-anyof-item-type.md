# Item type Schema

```txt
undefined#/properties/paths/propertyNames/anyOf/1
```

The category of the registry item. Determines how the item is classified and which default install path it uses when resolving files.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## 1 Type

`string` ([Item type](config-properties-paths-propertynames-anyof-item-type.md))

## 1 Constraints

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

## 1 Examples

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
