# Schema Schema

```txt
undefined#/properties/$schema
```

URL of the JSON Schema used to validate this registry config. Editors and tooling use it for autocomplete and validation.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../docs/registry.schema.json "open original schema") |

## $schema Type

`string` ([Schema](registry-properties-schema.md))

## $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

## $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```

## $schema Examples

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```
