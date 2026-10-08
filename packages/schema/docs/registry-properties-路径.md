# 路径 Schema

```txt
undefined#/properties/defaultPaths
```

将 registry item 类型映射到安装目标路径。用 "\*" 作为未显式配置类型的兜底。路径可使用别名，例如 "\~/components"。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## defaultPaths Type

`object` ([路径](registry-properties-路径.md))

## defaultPaths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```

# defaultPaths Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                              |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Registry 配置](registry-properties-路径-additionalproperties.md "undefined#/properties/defaultPaths/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Registry 配置](registry-properties-路径-additionalproperties.md "undefined#/properties/defaultPaths/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
