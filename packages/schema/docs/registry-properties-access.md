# Access Schema

```txt
undefined#/properties/access
```

Controls who can access this registry. "public" registries are open to everyone; "private" registries require authorization.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## access Type

`string` ([Access](registry-properties-access.md))

## access Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"public"`  |             |
| `"private"` |             |

## access Default Value

The default value is:

```json
"public"
```

## access Examples

```json
"public"
```

```json
"private"
```
