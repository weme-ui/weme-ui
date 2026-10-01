# Project lock file Schema

```txt
undefined
```

Records which registry items have been installed into a Weme UI project, including their source registry and the exact files written on disk.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [lockfile.schema.json](../../../docs/lockfile.schema.json "open original schema") |

## Project lock file Type

`object` ([Project lock file](lockfile.md))

## Project lock file Examples

```json
{
  "$schema": "https://weme-ui.github.io/weme-ui/lockfile.schema.json",
  "items": [
    {
      "registry": "weme-ui/slim",
      "prefix": "weme",
      "files": [
        {
          "source": "button/button.vue",
          "dest": "src/components/ui/button/button.vue"
        }
      ]
    }
  ]
}
```

# Project lock file Properties

| Property           | Type     | Required | Nullable       | Defined by                                                                         |
| :----------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------- |
| [$schema](#schema) | `string` | Required | cannot be null | [Project lock file](lockfile-properties-schema.md "undefined#/properties/$schema") |
| [items](#items)    | `array`  | Required | cannot be null | [Project lock file](lockfile-properties-items.md "undefined#/properties/items")    |

## $schema

URL of the JSON Schema used to validate this project lock file. Editors and tooling use it for autocomplete and validation.

`$schema`

* is required

* Type: `string` ([Schema](lockfile-properties-schema.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](lockfile-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/lockfile.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/lockfile.schema.json"
```

## items

The registry items currently installed in the project. Used to track provenance and installed file locations across updates.

`items`

* is required

* Type: `object[]` ([Installed item](lockfile-properties-items-installed-item.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items.md "undefined#/properties/items")

### items Type

`object[]` ([Installed item](lockfile-properties-items-installed-item.md))

### items Examples

```json
{
  "registry": "weme-ui/slim",
  "prefix": "weme",
  "files": [
    {
      "source": "button/button.vue",
      "dest": "src/components/ui/button/button.vue"
    }
  ]
}
```
