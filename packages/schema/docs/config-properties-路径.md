# 路径 Schema

```txt
undefined#/properties/paths
```

将 registry item 类型映射到安装目标路径。用 "\*" 作为未显式配置类型的兜底。路径可使用别名，例如 "\~/components"。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## paths Type

`object` ([路径](config-properties-路径.md))

## paths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```

# paths Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                              |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| Additional Properties | `string` | Optional | cannot be null | [项目配置](config-properties-路径-additionalproperties.md "undefined#/properties/paths/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [项目配置](config-properties-路径-additionalproperties.md "undefined#/properties/paths/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
