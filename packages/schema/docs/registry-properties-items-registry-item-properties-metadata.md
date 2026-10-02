# Metadata Schema

```txt
undefined#/properties/items/items/properties/meta
```

Arbitrary key-value metadata for tooling and documentation. Docs display fields use the "docs.\*" namespace, e.g. "docs.category" and "docs.categoryLabel".

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## meta Type

`object` ([Metadata](registry-properties-items-registry-item-properties-metadata.md))

## meta Examples

```json
{
  "docs.category": "actions",
  "docs.categoryLabel": "Actions"
}
```

# meta Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                             |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-metadata-additionalproperties.md "undefined#/properties/items/items/properties/meta/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-metadata-additionalproperties.md "undefined#/properties/items/items/properties/meta/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `1`
