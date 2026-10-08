# CSS 变量 Schema

```txt
undefined#/properties/unocss/properties/cssVars
```

项目主题的额外 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## cssVars Type

`object` ([CSS 变量](config-properties-unocss-扩展-properties-css-变量.md))

## cssVars Examples

```json
{
  "theme": {
    "color-primary": "oklch(0.55 0.2 250)"
  }
}
```

```json
{
  "theme": {
    "radius-lg": "0.75rem"
  }
}
```

# cssVars Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                           |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-css-变量-additionalproperties.md "undefined#/properties/unocss/properties/cssVars/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `object` ([Details](config-properties-unocss-扩展-properties-css-变量-additionalproperties.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-css-变量-additionalproperties.md "undefined#/properties/unocss/properties/cssVars/additionalProperties")

### additionalProperties Type

`object` ([Details](config-properties-unocss-扩展-properties-css-变量-additionalproperties.md))
