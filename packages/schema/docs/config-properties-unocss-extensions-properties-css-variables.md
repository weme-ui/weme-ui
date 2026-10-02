# CSS variables Schema

```txt
undefined#/properties/unocss/properties/cssVars
```

Additional CSS custom properties for the project theme. Values are merged into UnoCSS preset options, nested as theme-key → variable-name → value.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## cssVars Type

`object` ([CSS variables](config-properties-unocss-extensions-properties-css-variables.md))

## cssVars Examples

```json
{
  "theme": {
    "radius-lg": "0.75rem"
  }
}
```

# cssVars Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                           |
| :-------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `object` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions-properties-css-variables-additionalproperties.md "undefined#/properties/unocss/properties/cssVars/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `object` ([Details](config-properties-unocss-extensions-properties-css-variables-additionalproperties.md))

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions-properties-css-variables-additionalproperties.md "undefined#/properties/unocss/properties/cssVars/additionalProperties")

### additionalProperties Type

`object` ([Details](config-properties-unocss-extensions-properties-css-variables-additionalproperties.md))
