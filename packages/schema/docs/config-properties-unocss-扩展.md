# UnoCSS 扩展 Schema

```txt
undefined#/properties/unocss
```

项目级 UnoCSS 主题扩展。用于自定义强调色、中性色，以及注入 UnoCSS preset 的额外 CSS 变量。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## unocss Type

`object` ([UnoCSS 扩展](config-properties-unocss-扩展.md))

# unocss Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                 |
| :------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------- |
| [accent](#accent)   | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-强调色.md "undefined#/properties/unocss/properties/accent")     |
| [neutral](#neutral) | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-中性色.md "undefined#/properties/unocss/properties/neutral")    |
| [cssVars](#cssvars) | `object` | Optional | cannot be null | [项目配置](config-properties-unocss-扩展-properties-css-变量.md "undefined#/properties/unocss/properties/cssVars") |

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
  "primary": "oklch(0.55 0.2 250)",
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
  "base": "oklch(0.2 0 0)",
  "muted": "oklch(0.55 0 0)"
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
