# Registries Schema

```txt
undefined#/properties/registries
```

已注册 registry 名称到磁盘目录路径的映射。键为 "owner/registry" 形式；值为各 registry 根目录的相对或绝对路径。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [manifest.schema.json\*](../../website/public/manifest.schema.json "open original schema") |

## registries Type

`object` ([Registries](manifest-properties-registries.md))

## registries Examples

```json
{
  "weme-ui/core": "registry/core",
  "weme-ui/slim": "registry/slim"
}
```

# registries Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                          |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Registry manifest](manifest-properties-registries-additionalproperties.md "undefined#/properties/registries/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Registry manifest](manifest-properties-registries-additionalproperties.md "undefined#/properties/registries/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
