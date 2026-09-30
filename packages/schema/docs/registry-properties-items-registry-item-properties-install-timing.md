# Install timing Schema

```txt
undefined#/properties/items/items/properties/when
```

Controls when this item is installed during passive (automatic) installation. "on-init" installs as soon as the registry is initialized; "on-depended" installs only when another item depends on it. Explicit installs are unaffected.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## when Type

`string` ([Install timing](registry-properties-items-registry-item-properties-install-timing.md))

## when Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | :---------- |
| `"on-init"`     |             |
| `"on-depended"` |             |

## when Default Value

The default value is:

```json
"on-depended"
```

## when Examples

```json
"on-init"
```

```json
"on-depended"
```
