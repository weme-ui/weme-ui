# UnoCSS extensions Schema

```txt
undefined#/properties/unocss
```

Project-level UnoCSS theme extensions. Use this to customize accent colors, neutral colors, and additional CSS variables injected into the UnoCSS preset.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## unocss Type

`object` ([UnoCSS extensions](config-properties-unocss-extensions.md))

# unocss Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                  |
| :------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| [accent](#accent)   | `object` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions-properties-accent-colors.md "undefined#/properties/unocss/properties/accent")   |
| [neutral](#neutral) | `object` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions-properties-neutral-colors.md "undefined#/properties/unocss/properties/neutral") |
| [cssVars](#cssvars) | `object` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions-properties-css-variables.md "undefined#/properties/unocss/properties/cssVars")  |

## accent

Accent (brand) color tokens for the project theme. Keys are token names and values are CSS color strings, typically in oklch.

`accent`

* is optional

* Type: `object` ([Accent colors](config-properties-unocss-extensions-properties-accent-colors.md))

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions-properties-accent-colors.md "undefined#/properties/unocss/properties/accent")

### accent Type

`object` ([Accent colors](config-properties-unocss-extensions-properties-accent-colors.md))

### accent Examples

```json
{
  "primary": "oklch(0.55 0.2 250)",
  "secondary": "oklch(0.7 0.15 40)"
}
```

## neutral

Neutral (gray-scale) color tokens for the project theme. Keys are token names and values are CSS color strings, typically in oklch.

`neutral`

* is optional

* Type: `object` ([Neutral colors](config-properties-unocss-extensions-properties-neutral-colors.md))

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions-properties-neutral-colors.md "undefined#/properties/unocss/properties/neutral")

### neutral Type

`object` ([Neutral colors](config-properties-unocss-extensions-properties-neutral-colors.md))

### neutral Examples

```json
{
  "base": "oklch(0.2 0 0)",
  "muted": "oklch(0.55 0 0)"
}
```

## cssVars

Additional CSS custom properties for the project theme. Values are merged into UnoCSS preset options, nested as theme-key → variable-name → value.

`cssVars`

* is optional

* Type: `object` ([CSS variables](config-properties-unocss-extensions-properties-css-variables.md))

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions-properties-css-variables.md "undefined#/properties/unocss/properties/cssVars")

### cssVars Type

`object` ([CSS variables](config-properties-unocss-extensions-properties-css-variables.md))

### cssVars Examples

```json
{
  "theme": {
    "radius-lg": "0.75rem"
  }
}
```
