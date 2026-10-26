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

| Property            | Type     | Required | Nullable       | Defined by                                                                                                 |
| :------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------- |
| [colors](#colors)   | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-自定义颜色.md "undefined#/properties/unocss/properties/colors")   |
| [cssVars](#cssvars) | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-css-变量.md "undefined#/properties/unocss/properties/cssVars") |

## colors

项目自定义的颜色 token。

`colors`

* is optional

* Type: `object` ([自定义颜色](config-properties-unocss-扩展-properties-自定义颜色.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-自定义颜色.md "undefined#/properties/unocss/properties/colors")

### colors Type

`object` ([自定义颜色](config-properties-unocss-扩展-properties-自定义颜色.md))

### colors Examples

```json
{
  "brand": "oklch(0.55 0.2 250)",
  "secondary": "oklch(0.7 0.15 40)",
  "stone": "oklch(0.2 0 0)"
}
```

## cssVars

项目主题的额外 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。

`cssVars`

* is optional

* Type: `object` ([CSS 变量](config-properties-unocss-扩展-properties-css-变量.md))

* cannot be null

* defined in: [项目配置](config-properties-unocss-扩展-properties-css-变量.md "undefined#/properties/unocss/properties/cssVars")

### cssVars Type

`object` ([CSS 变量](config-properties-unocss-扩展-properties-css-变量.md))

### cssVars Examples

```json
{
  "card": {
    "bg-color": "oklch(0.55 0.2 250)"
  }
}
```

```json
{
  "card": {
    "radius": "0.75rem"
  }
}
```
