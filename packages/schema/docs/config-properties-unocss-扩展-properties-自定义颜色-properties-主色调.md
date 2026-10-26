# 主色调 Schema

```txt
undefined#/properties/unocss/properties/colors/properties/accent
```

项目主题的主色调 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## accent Type

`object` ([主色调](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调.md))

## accent Examples

```json
{
  "brand": "oklch(0.55 0.2 250)",
  "secondary": "oklch(0.7 0.15 40)"
}
```

# accent Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                          |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调-additionalproperties.md "undefined#/properties/unocss/properties/colors/properties/accent/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调-additionalproperties.md "undefined#/properties/unocss/properties/colors/properties/accent/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
