# 自定义颜色 Schema

```txt
undefined#/properties/unocss/properties/colors
```

项目自定义的颜色 token。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## colors Type

`object` ([自定义颜色](config-properties-unocss-扩展-properties-自定义颜色.md))

## colors Examples

```json
{
  "brand": "oklch(0.55 0.2 250)",
  "secondary": "oklch(0.7 0.15 40)",
  "stone": "oklch(0.2 0 0)"
}
```

# colors Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                 |
| :------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| [accent](#accent)   | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调.md "undefined#/properties/unocss/properties/colors/properties/accent")  |
| [neutral](#neutral) | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-自定义颜色-properties-中性色.md "undefined#/properties/unocss/properties/colors/properties/neutral") |

## accent

项目主题的主色调 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。

`accent`

* is optional

* Type: `object` ([主色调](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调.md "undefined#/properties/unocss/properties/colors/properties/accent")

### accent Type

`object` ([主色调](config-properties-unocss-扩展-properties-自定义颜色-properties-主色调.md))

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

* Type: `object` ([中性色](config-properties-unocss-扩展-properties-自定义颜色-properties-中性色.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-自定义颜色-properties-中性色.md "undefined#/properties/unocss/properties/colors/properties/neutral")

### neutral Type

`object` ([中性色](config-properties-unocss-扩展-properties-自定义颜色-properties-中性色.md))

### neutral Examples

```json
{
  "stone": "oklch(0.2 0 0)"
}
```
