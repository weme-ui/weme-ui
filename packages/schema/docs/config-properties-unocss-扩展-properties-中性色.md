# 中性色 Schema

```txt
undefined#/properties/unocss/properties/neutral
```

项目主题的中性（灰阶）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## neutral Type

`object` ([中性色](config-properties-unocss-扩展-properties-中性色.md))

## neutral Examples

```json
{
  "base": "oklch(0.2 0 0)",
  "muted": "oklch(0.55 0 0)"
}
```

# neutral Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                        |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Additional Properties | `string` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-中性色-additionalproperties.md "undefined#/properties/unocss/properties/neutral/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-中性色-additionalproperties.md "undefined#/properties/unocss/properties/neutral/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
