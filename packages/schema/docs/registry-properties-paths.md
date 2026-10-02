# Paths Schema

```txt
undefined#/properties/defaultPaths
```

Maps registry item types to install destinations. Use "\*" as a catch-all for types without an explicit path. Paths may use aliases such as "\~/components".

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## defaultPaths Type

`object` ([Paths](registry-properties-paths.md))

## defaultPaths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```

# defaultPaths Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                            |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Additional Properties | `string` | Optional | cannot be null | [Registry configuration](registry-properties-paths-additionalproperties.md "undefined#/properties/defaultPaths/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Registry configuration](registry-properties-paths-additionalproperties.md "undefined#/properties/defaultPaths/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
