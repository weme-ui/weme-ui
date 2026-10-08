# 元数据 Schema

```txt
undefined#/properties/items/items/properties/meta
```

供工具链与文档使用的任意键值元数据。文档展示字段使用 "docs.\*" 命名空间，例如 "docs.category" 与 "docs.categoryLabel"。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## meta Type

`object` ([元数据](registry-properties-items-registry-item-properties-元数据.md))

## meta Examples

```json
{
  "docs.category": "actions",
  "docs.categoryLabel": "Actions"
}
```

# meta Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                             |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-元数据-additionalproperties.md "undefined#/properties/items/items/properties/meta/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-元数据-additionalproperties.md "undefined#/properties/items/items/properties/meta/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
