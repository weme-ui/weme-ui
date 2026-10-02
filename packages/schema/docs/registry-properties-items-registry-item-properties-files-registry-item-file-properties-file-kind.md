# File kind Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/kind
```

The role of a file within a registry item. "file" is the primary source; "doc", "example", and "test" mark supporting documentation, demos, and tests respectively.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## kind Type

`string` ([File kind](registry-properties-items-registry-item-properties-files-registry-item-file-properties-file-kind.md))

## kind Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"file"`    |             |
| `"doc"`     |             |
| `"example"` |             |
| `"test"`    |             |

## kind Default Value

The default value is:

```json
"file"
```

## kind Examples

```json
"file"
```

```json
"doc"
```

```json
"example"
```

```json
"test"
```
