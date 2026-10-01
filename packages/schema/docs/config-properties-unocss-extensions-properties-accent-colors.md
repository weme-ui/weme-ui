# Accent colors Schema

```txt
undefined#/properties/unocss/properties/accent
```

Accent (brand) color tokens for the project theme. Keys are token names and values are CSS color strings, typically in oklch.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                      |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../../docs/config.schema.json "open original schema") |

## accent Type

`object` ([Accent colors](config-properties-unocss-extensions-properties-accent-colors.md))

## accent Examples

```json
{
  "primary": "oklch(0.55 0.2 250)",
  "secondary": "oklch(0.7 0.15 40)"
}
```

# accent Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                          |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions-properties-accent-colors-additionalproperties.md "undefined#/properties/unocss/properties/accent/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions-properties-accent-colors-additionalproperties.md "undefined#/properties/unocss/properties/accent/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
