# Registry manifest Schema

```txt
undefined
```

An index of registries available in a repository or workspace. Maps each registry name to the directory that contains its configuration and items.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [manifest.schema.json](../../../docs/manifest.schema.json "open original schema") |

## Registry manifest Type

`object` ([Registry manifest](manifest.md))

## Registry manifest Examples

```json
{
  "$schema": "https://weme-ui.github.io/weme-ui/manifest.schema.json",
  "registries": {
    "weme-ui/core": "registry/core",
    "weme-ui/slim": "registry/slim"
  }
}
```

# Registry manifest Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                |
| :------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------- |
| [$schema](#schema)        | `string` | Required | cannot be null | [Registry manifest](manifest-properties-schema.md "undefined#/properties/$schema")        |
| [registries](#registries) | `object` | Required | cannot be null | [Registry manifest](manifest-properties-registries.md "undefined#/properties/registries") |

## $schema

URL of the JSON Schema used to validate this registry manifest. Editors and tooling use it for autocomplete and validation.

`$schema`

* is required

* Type: `string` ([Schema](manifest-properties-schema.md))

* cannot be null

* defined in: [Registry manifest](manifest-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](manifest-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/manifest.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/manifest.schema.json"
```

## registries

A map of registered registry names to their directory paths on disk. Keys use the "owner/registry" form; values are relative or absolute paths to each registry root.

`registries`

* is required

* Type: `object` ([Registries](manifest-properties-registries.md))

* cannot be null

* defined in: [Registry manifest](manifest-properties-registries.md "undefined#/properties/registries")

### registries Type

`object` ([Registries](manifest-properties-registries.md))

### registries Examples

```json
{
  "weme-ui/core": "registry/core",
  "weme-ui/slim": "registry/slim"
}
```
