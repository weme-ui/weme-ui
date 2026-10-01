# Registry configuration Schema

```txt
undefined
```

Configuration for a Weme UI registry. Declares identity, access, default install paths, and the items the registry exposes.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [registry.schema.json](../../../docs/registry.schema.json "open original schema") |

## Registry configuration Type

`object` ([Registry configuration](registry.md))

## Registry configuration Examples

```json
{
  "name": "weme-ui/slim",
  "access": "public",
  "defaultPaths": {
    "component": "~/components"
  },
  "items": [
    {
      "name": "button",
      "title": "Button",
      "files": [
        {
          "path": "button/button.vue"
        }
      ]
    }
  ]
}
```

# Registry configuration Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                |
| :---------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------- |
| [$schema](#schema)                  | `string` | Required | cannot be null | [Registry configuration](registry-properties-schema.md "undefined#/properties/$schema")                   |
| [name](#name)                       | `string` | Required | cannot be null | [Registry configuration](registry-properties-registry-name.md "undefined#/properties/name")               |
| [description](#description)         | `string` | Optional | cannot be null | [Registry configuration](registry-properties-description.md "undefined#/properties/description")          |
| [version](#version)                 | `string` | Optional | cannot be null | [Registry configuration](registry-properties-version.md "undefined#/properties/version")                  |
| [homepage](#homepage)               | `string` | Optional | cannot be null | [Registry configuration](registry-properties-homepage.md "undefined#/properties/homepage")                |
| [repository](#repository)           | `string` | Optional | cannot be null | [Registry configuration](registry-properties-repository.md "undefined#/properties/repository")            |
| [issues](#issues)                   | `string` | Optional | cannot be null | [Registry configuration](registry-properties-issues.md "undefined#/properties/issues")                    |
| [contributors](#contributors)       | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-contributors.md "undefined#/properties/contributors")        |
| [access](#access)                   | `string` | Optional | cannot be null | [Registry configuration](registry-properties-access.md "undefined#/properties/access")                    |
| [dependencies](#dependencies)       | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-dependencies.md "undefined#/properties/dependencies")        |
| [devDependencies](#devdependencies) | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-dev-dependencies.md "undefined#/properties/devDependencies") |
| [items](#items)                     | `array`  | Required | cannot be null | [Registry configuration](registry-properties-items.md "undefined#/properties/items")                      |
| [meta](#meta)                       | `object` | Optional | cannot be null | [Registry configuration](registry-properties-metadata.md "undefined#/properties/meta")                    |
| [exclude](#exclude)                 | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-exclude.md "undefined#/properties/exclude")                  |
| [defaultPaths](#defaultpaths)       | `object` | Optional | cannot be null | [Registry configuration](registry-properties-paths.md "undefined#/properties/defaultPaths")               |

## $schema

URL of the JSON Schema used to validate this registry config. Editors and tooling use it for autocomplete and validation.

`$schema`

* is required

* Type: `string` ([Schema](registry-properties-schema.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-schema.md "undefined#/properties/$schema")

### $schema Type

`string` ([Schema](registry-properties-schema.md))

### $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```

### $schema Examples

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```

## name

The unique name of the registry in the form "owner/registry". Used to identify and resolve this registry across the ecosystem.

`name`

* is required

* Type: `string` ([Registry name](registry-properties-registry-name.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-registry-name.md "undefined#/properties/name")

### name Type

`string` ([Registry name](registry-properties-registry-name.md))

### name Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^A-Z]*(\/)[^A-Z]*$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5EA-Z%5D*\(%5C%2F\)%5B%5EA-Z%5D*%24 "try regular expression with regexr.com")

### name Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```

## description

A short human-readable summary of what this registry contains and what it is for.

`description`

* is optional

* Type: `string` ([Description](registry-properties-description.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-description.md "undefined#/properties/description")

### description Type

`string` ([Description](registry-properties-description.md))

### description Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### description Examples

```json
"The slim registry of Weme UI"
```

## version

The version of this registry. Prefer a semver-compatible string so consumers can reason about upgrades.

`version`

* is optional

* Type: `string` ([Version](registry-properties-version.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-version.md "undefined#/properties/version")

### version Type

`string` ([Version](registry-properties-version.md))

### version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### version Examples

```json
"1.0.0"
```

```json
"2.1.3"
```

## homepage

The URL of the project homepage for this registry.

`homepage`

* is optional

* Type: `string` ([Homepage](registry-properties-homepage.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-homepage.md "undefined#/properties/homepage")

### homepage Type

`string` ([Homepage](registry-properties-homepage.md))

### homepage Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### homepage Examples

```json
"https://weme-ui.com"
```

## repository

The URL of the source code repository for this registry.

`repository`

* is optional

* Type: `string` ([Repository](registry-properties-repository.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-repository.md "undefined#/properties/repository")

### repository Type

`string` ([Repository](registry-properties-repository.md))

### repository Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### repository Examples

```json
"https://github.com/weme-ui/weme-ui"
```

## issues

The URL of the issue tracker where people can report problems with this registry.

`issues`

* is optional

* Type: `string` ([Issues](registry-properties-issues.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-issues.md "undefined#/properties/issues")

### issues Type

`string` ([Issues](registry-properties-issues.md))

### issues Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### issues Examples

```json
"https://github.com/weme-ui/weme-ui/issues"
```

## contributors

A list of people who have contributed to this registry. Each entry is typically a name, optionally followed by an email address.

`contributors`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-contributors.md "undefined#/properties/contributors")

### contributors Type

`string[]`

### contributors Examples

```json
"Luo Yi <luoyi@mouji.com>"
```

## access

Controls who can access this registry. "public" registries are open to everyone; "private" registries require authorization.

`access`

* is optional

* Type: `string` ([Access](registry-properties-access.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-access.md "undefined#/properties/access")

### access Type

`string` ([Access](registry-properties-access.md))

### access Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"public"`  |             |
| `"private"` |             |

### access Default Value

The default value is:

```json
"public"
```

### access Examples

```json
"public"
```

```json
"private"
```

## dependencies

Default runtime NPM packages installed into a consumer project when this registry is initialized. Unlike item-level dependencies, these apply once for the whole registry. Entries may include a version range or tag, e.g. "vue^3.4.0" or "lodash\@latest".

`dependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-dependencies.md "undefined#/properties/dependencies")

### dependencies Type

`string[]`

### dependencies Examples

```json
"vue^3.4.0"
```

```json
"class-variance-authority@latest"
```

## devDependencies

Default development-only NPM packages installed into a consumer project when this registry is initialized. Use for tooling shared across the registry (e.g. test helpers), not for packages required at application runtime. Entries may include a version range or tag.

`devDependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-dev-dependencies.md "undefined#/properties/devDependencies")

### devDependencies Type

`string[]`

### devDependencies Examples

```json
"vitest^2.0.0"
```

```json
"@vue/test-utils@latest"
```

## items

The catalog of registry items published by this registry. Each item describes an installable unit such as a component, block, or utility.

`items`

* is required

* Type: `object[]` ([Registry item](registry-properties-items-registry-item.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items.md "undefined#/properties/items")

### items Type

`object[]` ([Registry item](registry-properties-items-registry-item.md))

### items Examples

```json
{
  "name": "button",
  "title": "Button",
  "description": "A button component"
}
```

## meta

Arbitrary key-value metadata for tooling and discovery. Values are free-form strings and are not interpreted by the schema itself.

`meta`

* is optional

* Type: `object` ([Metadata](registry-properties-metadata.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-metadata.md "undefined#/properties/meta")

### meta Type

`object` ([Metadata](registry-properties-metadata.md))

### meta Examples

```json
{
  "category": "component",
  "framework": "vue"
}
```

## exclude

A list of registry item names to omit from resolution or installation. Useful for temporarily hiding unfinished or deprecated items.

`exclude`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-exclude.md "undefined#/properties/exclude")

### exclude Type

`string[]`

### exclude Examples

```json
"button"
```

```json
"legacy-card"
```

## defaultPaths

Maps registry item types to install destinations. Use "\*" as a catch-all for types without an explicit path. Paths may use aliases such as "\~/components".

`defaultPaths`

* is optional

* Type: `object` ([Paths](registry-properties-paths.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-paths.md "undefined#/properties/defaultPaths")

### defaultPaths Type

`object` ([Paths](registry-properties-paths.md))

### defaultPaths Examples

```json
{
  "*": "~/registry",
  "component": "~/components",
  "ui": "~/components/ui"
}
```
