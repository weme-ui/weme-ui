# CSS 变量 Schema

```txt
undefined#/properties/items/items/properties/cssVars
```

安装该 item 时注入的 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## cssVars Type

`object` ([CSS 变量](registry-properties-items-registry-item-properties-css-变量.md))

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
    "color-primary": "oklch(0.55 0.2 250)"
  }
}
```

# cssVars Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                   |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `object` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-css-变量-additionalproperties.md "undefined#/properties/items/items/properties/cssVars/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `object` ([Details](registry-properties-items-registry-item-properties-css-变量-additionalproperties.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-css-变量-additionalproperties.md "undefined#/properties/items/items/properties/cssVars/additionalProperties")

### additionalProperties Type

`object` ([Details](registry-properties-items-registry-item-properties-css-变量-additionalproperties.md))
