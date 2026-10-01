# Project configuration Schema

```txt
undefined
```

Configuration for a Weme UI project. Declares install paths, registered registries, and optional UnoCSS theme extensions.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json](../../../docs/config.schema.json "open original schema") |

## Project configuration Type

`object` ([Project configuration](config.md))

## Project configuration Examples

```json
{
  "paths": {
    "component": "~/components",
    "ui": "~/components/ui"
  },
  "registries": [
    {
      "registry": "weme-ui/slim",
      "prefix": "weme"
    }
  ]
}
```

# Project configuration Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                     |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------- |
| [$schema](#schema)        | `string` | Required | cannot be null | [Project configuration](config-properties-schema.md "undefined#/properties/$schema")           |
| [paths](#paths)           | `object` | Optional | cannot be null | [Project configuration](config-properties-paths.md "undefined#/properties/paths")              |
| [registries](#registries) | `array`  | Optional | cannot be null | [Project configuration](config-properties-registries.md "undefined#/properties/registries")    |
| [unocss](#unocss)         | `object` | Optional | cannot be null | [Project configuration](config-properties-unocss-extensions.md "undefined#/properties/unocss") |

## $schema

URL of the JSON Schema used to validate this project config. Editors and tooling use it for autocomplete and validation.

`$schema`

* is required

* Type: `string` ([Schema](config-properties-schema.md))

* cannot be null

* defined in: [Project configuration](config-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](config-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/config.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/config.schema.json"
```

## paths

Maps registry item types to install destinations. Use "\*" as a catch-all for types without an explicit path. Paths may use aliases such as "\~/components".

`paths`

* is optional

* Type: `object` ([Paths](config-properties-paths.md))

* cannot be null

* defined in: [Project configuration](config-properties-paths.md "undefined#/properties/paths")

### paths Type

`object` ([Paths](config-properties-paths.md))

### paths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```

## registries

Registries registered with this project. Each entry selects a registry and may specify a repository source and install prefix.

`registries`

* is optional

* Type: `object[]` ([Registered registry](config-properties-registries-registered-registry.md))

* cannot be null

* defined in: [Project configuration](config-properties-registries.md "undefined#/properties/registries")

### registries Type

`object[]` ([Registered registry](config-properties-registries-registered-registry.md))

### registries Examples

```json
{
  "repo": "https://github.com/weme-ui/weme-ui",
  "registry": "weme-ui/slim",
  "prefix": "weme"
}
```

## unocss

Project-level UnoCSS theme extensions. Use this to customize accent colors, neutral colors, and additional CSS variables injected into the UnoCSS preset.

`unocss`

* is optional

* Type: `object` ([UnoCSS extensions](config-properties-unocss-extensions.md))

* cannot be null

* defined in: [Project configuration](config-properties-unocss-extensions.md "undefined#/properties/unocss")

### unocss Type

`object` ([UnoCSS extensions](config-properties-unocss-extensions.md))
