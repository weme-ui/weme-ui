# Neutral colors Schema

```txt
undefined#/properties/unocss/properties/neutral
```

Neutral (gray-scale) color tokens for the project theme. Keys are token names and values are CSS color strings, typically in oklch.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                      |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../../docs/config.schema.json "open original schema") |

## neutral Type

`object` ([Neutral colors](config-properties-unocss-extensions-properties-neutral-colors.md))

## neutral Examples

```json
{
  "base": "oklch(0.2 0 0)",
  "muted": "oklch(0.55 0 0)"
}
```

# neutral Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                            |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Additional Properties | `string` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions-properties-neutral-colors-additionalproperties.md "undefined#/properties/unocss/properties/neutral/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions-properties-neutral-colors-additionalproperties.md "undefined#/properties/unocss/properties/neutral/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
