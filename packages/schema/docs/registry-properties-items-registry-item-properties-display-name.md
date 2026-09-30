# Display name Schema

```txt
undefined#/properties/items/items/properties/title
```

A human-friendly display name for the item, shown in UIs and documentation. Falls back to the name when omitted.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## title Type

`string` ([Display name](registry-properties-items-registry-item-properties-display-name.md))

## title Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## title Examples

```json
"Button"
```

```json
"Use Toggle"
```
