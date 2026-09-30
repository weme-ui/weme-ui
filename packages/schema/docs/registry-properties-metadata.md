# Metadata Schema

```txt
undefined#/properties/meta
```

Arbitrary key-value metadata for tooling and discovery. Values are free-form strings and are not interpreted by the schema itself.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## meta Type

`object` ([Metadata](registry-properties-metadata.md))

## meta Examples

```json
{
  "category": "component",
  "framework": "vue"
}
```

# meta Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                       |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Registry configuration](registry-properties-metadata-additionalproperties.md "undefined#/properties/meta/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Registry configuration](registry-properties-metadata-additionalproperties.md "undefined#/properties/meta/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
