# UnoCSS 扩展 Schema

```txt
undefined#/properties/unocss
```

项目级 UnoCSS 主题扩展。用于自定义强调色、中性色。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## unocss Type

`object` ([UnoCSS 扩展](config-properties-unocss-扩展.md))

# unocss Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                              |
| :------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| [accent](#accent)   | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-强调色.md "undefined#/properties/unocss/properties/accent")  |
| [neutral](#neutral) | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-中性色.md "undefined#/properties/unocss/properties/neutral") |

## accent

项目主题的强调（品牌）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。

`accent`

* is optional

* Type: `object` ([强调色](config-properties-unocss-扩展-properties-强调色.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-强调色.md "undefined#/properties/unocss/properties/accent")

### accent Type

`object` ([强调色](config-properties-unocss-扩展-properties-强调色.md))

### accent Examples

```json
{
  "brand": "oklch(0.55 0.2 250)",
  "secondary": "oklch(0.7 0.15 40)"
}
```

## neutral

项目主题的中性（灰阶）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。

`neutral`

* is optional

* Type: `object` ([中性色](config-properties-unocss-扩展-properties-中性色.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-中性色.md "undefined#/properties/unocss/properties/neutral")

### neutral Type

`object` ([中性色](config-properties-unocss-扩展-properties-中性色.md))

### neutral Examples

```json
{
  "stone": "oklch(0.2 0 0)"
}
```
