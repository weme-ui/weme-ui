# 主题配置 Schema

```txt
undefined#/properties/theme
```

项目主题配置。声明启用的主题色、中性色与色盘，用于构建主题变量。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## theme Type

`object` ([主题配置](config-properties-主题配置.md))

## theme Examples

```json
{
  "accentColors": [
    "clay",
    "forest"
  ],
  "neutralColors": [
    "stone",
    "slate"
  ],
  "colorPalettes": [
    "neutral",
    "rose"
  ]
}
```

# theme Properties

| Property                        | Type    | Required | Nullable       | Defined by                                                                                              |
| :------------------------------ | :------ | :------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| [accentColors](#accentcolors)   | `array` | Optional | cannot be null | [项目配置](config-properties-主题配置-properties-主题色.md "undefined#/properties/theme/properties/accentColors")  |
| [neutralColors](#neutralcolors) | `array` | Optional | cannot be null | [项目配置](config-properties-主题配置-properties-中性色.md "undefined#/properties/theme/properties/neutralColors") |
| [colorPalettes](#colorpalettes) | `array` | Optional | cannot be null | [项目配置](config-properties-主题配置-properties-色盘.md "undefined#/properties/theme/properties/colorPalettes")  |

## accentColors

项目启用的主题色列表，用于构建主题变量。

`accentColors`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [项目配置](config-properties-主题配置-properties-主题色.md "undefined#/properties/theme/properties/accentColors")

### accentColors Type

`string[]`

### accentColors Examples

```json
"clay"
```

```json
"forest"
```

## neutralColors

项目启用的中性色列表，用于构建主题变量。

`neutralColors`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [项目配置](config-properties-主题配置-properties-中性色.md "undefined#/properties/theme/properties/neutralColors")

### neutralColors Type

`string[]`

### neutralColors Examples

```json
"stone"
```

```json
"slate"
```

## colorPalettes

项目启用的色盘列表，用于图标、图示等视觉元素的颜色选择。

`colorPalettes`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [项目配置](config-properties-主题配置-properties-色盘.md "undefined#/properties/theme/properties/colorPalettes")

### colorPalettes Type

`string[]`

### colorPalettes Examples

```json
"neutral"
```

```json
"rose"
```
