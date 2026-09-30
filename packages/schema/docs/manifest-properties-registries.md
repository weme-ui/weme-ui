# Registries Schema

```txt
undefined#/properties/registries
```

A map of registered registry names to their directory paths on disk. Keys use the "owner/registry" form; values are relative or absolute paths to each registry root.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [manifest.schema.json\*](../../../manifest.schema.json "open original schema") |

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
