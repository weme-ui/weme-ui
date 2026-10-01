# CSS variables Schema

```txt
undefined#/properties/items/items/properties/cssVars
```

CSS custom properties to inject when this item is installed. Values are merged into UnoCSS preset options, nested as theme-key → variable-name → value.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../docs/registry.schema.json "open original schema") |

## cssVars Type

`object` ([CSS variables](registry-properties-items-registry-item-properties-css-variables.md))

## cssVars Examples

```json
{
  "theme": {
    "color-primary": "oklch(0.55 0.2 250)"
  }
}
```

# cssVars Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                     |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `object` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-css-variables-additionalproperties.md "undefined#/properties/items/items/properties/cssVars/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `object` ([Details](registry-properties-items-registry-item-properties-css-variables-additionalproperties.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-css-variables-additionalproperties.md "undefined#/properties/items/items/properties/cssVars/additionalProperties")

### additionalProperties Type

`object` ([Details](registry-properties-items-registry-item-properties-css-variables-additionalproperties.md))
