# Registry item Schema

```txt
undefined#/properties/items/items
```

A single installable unit in a registry. Describes identity, type, files, CSS variables, and both NPM and registry-level dependencies.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [registry.schema.json\*](../../../docs/registry.schema.json "open original schema") |

## items Type

`object` ([Registry item](registry-properties-items-registry-item.md))

## items Examples

```json
{
  "name": "button",
  "title": "Button",
  "description": "A versatile button component with multiple variants.",
  "type": "component",
  "files": [
    {
      "path": "button/button.vue"
    }
  ],
  "registryDependencies": [
    "utils"
  ]
}
```

# items Properties

| Property                                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                |
| :-------------------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [name](#name)                                 | `string` | Required | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-name.md "undefined#/properties/items/items/properties/name")                                  |
| [title](#title)                               | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-display-name.md "undefined#/properties/items/items/properties/title")                         |
| [description](#description)                   | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-description.md "undefined#/properties/items/items/properties/description")                    |
| [type](#type)                                 | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-type.md "undefined#/properties/items/items/properties/type")                                  |
| [when](#when)                                 | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-install-timing.md "undefined#/properties/items/items/properties/when")                        |
| [files](#files)                               | `array`  | Required | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-files.md "undefined#/properties/items/items/properties/files")                                |
| [cssVars](#cssvars)                           | `object` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-css-variables.md "undefined#/properties/items/items/properties/cssVars")                      |
| [dependencies](#dependencies)                 | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-dependencies.md "undefined#/properties/items/items/properties/dependencies")                  |
| [devDependencies](#devdependencies)           | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-dev-dependencies.md "undefined#/properties/items/items/properties/devDependencies")           |
| [registryDependencies](#registrydependencies) | `array`  | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-registry-dependencies.md "undefined#/properties/items/items/properties/registryDependencies") |

## name

The unique identifier of the registry item within its registry. Must be lowercase.

`name`

* is required

* Type: `string` ([Name](registry-properties-items-registry-item-properties-name.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-name.md "undefined#/properties/items/items/properties/name")

### name Type

`string` ([Name](registry-properties-items-registry-item-properties-name.md))

### name Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^A-Z]*$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5EA-Z%5D*%24 "try regular expression with regexr.com")

**unknown format**: the value of this string must follow the format: `lowercase`

### name Examples

```json
"button"
```

```json
"use-toggle"
```

## title

A human-friendly display name for the item, shown in UIs and documentation. Falls back to the name when omitted.

`title`

* is optional

* Type: `string` ([Display name](registry-properties-items-registry-item-properties-display-name.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-display-name.md "undefined#/properties/items/items/properties/title")

### title Type

`string` ([Display name](registry-properties-items-registry-item-properties-display-name.md))

### title Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### title Examples

```json
"Button"
```

```json
"Use Toggle"
```

## description

A short summary of what this registry item provides, useful for discovery and documentation.

`description`

* is optional

* Type: `string` ([Description](registry-properties-items-registry-item-properties-description.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-description.md "undefined#/properties/items/items/properties/description")

### description Type

`string` ([Description](registry-properties-items-registry-item-properties-description.md))

### description Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### description Examples

```json
"A versatile button component with multiple variants."
```

## type

The category of this registry item. Defaults to "block" when omitted. Used for classification and to select the matching default install path.

`type`

* is optional

* Type: `string` ([Type](registry-properties-items-registry-item-properties-type.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-type.md "undefined#/properties/items/items/properties/type")

### type Type

`string` ([Type](registry-properties-items-registry-item-properties-type.md))

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"component"`  |             |
| `"composable"` |             |
| `"ui"`         |             |
| `"block"`      |             |
| `"layout"`     |             |
| `"page"`       |             |
| `"util"`       |             |

### type Default Value

The default value is:

```json
"block"
```

### type Examples

```json
"block"
```

```json
"component"
```

```json
"composable"
```

```json
"ui"
```

```json
"layout"
```

```json
"page"
```

```json
"util"
```

## when

Controls when this item is installed during passive (automatic) installation. "on-init" installs as soon as the registry is initialized; "on-depended" installs only when another item depends on it. Explicit installs are unaffected.

`when`

* is optional

* Type: `string` ([Install timing](registry-properties-items-registry-item-properties-install-timing.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-install-timing.md "undefined#/properties/items/items/properties/when")

### when Type

`string` ([Install timing](registry-properties-items-registry-item-properties-install-timing.md))

### when Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | :---------- |
| `"on-init"`     |             |
| `"on-depended"` |             |

### when Default Value

The default value is:

```json
"on-depended"
```

### when Examples

```json
"on-init"
```

```json
"on-depended"
```

## files

The files that make up this registry item. At least the primary source files should be listed here.

`files`

* is required

* Type: `object[]` ([Registry item file](registry-properties-items-registry-item-properties-files-registry-item-file.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-files.md "undefined#/properties/items/items/properties/files")

### files Type

`object[]` ([Registry item file](registry-properties-items-registry-item-properties-files-registry-item-file.md))

### files Examples

```json
{
  "path": "button/button.vue"
}
```

## cssVars

CSS custom properties to inject when this item is installed. Values are merged into UnoCSS preset options, nested as theme-key → variable-name → value.

`cssVars`

* is optional

* Type: `object` ([CSS variables](registry-properties-items-registry-item-properties-css-variables.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-css-variables.md "undefined#/properties/items/items/properties/cssVars")

### cssVars Type

`object` ([CSS variables](registry-properties-items-registry-item-properties-css-variables.md))

### cssVars Examples

```json
{
  "theme": {
    "color-primary": "oklch(0.55 0.2 250)"
  }
}
```

## dependencies

NPM packages required at runtime by this item. Entries may include a version range or tag, e.g. "vue^3.0.0" or "lodash\@latest".

`dependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-dependencies.md "undefined#/properties/items/items/properties/dependencies")

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

NPM packages required only for developing or testing this item. These are not needed in production.

`devDependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-dev-dependencies.md "undefined#/properties/items/items/properties/devDependencies")

### devDependencies Type

`string[]`

### devDependencies Examples

```json
"vitest^2.0.0"
```

```json
"@vue/test-utils@latest"
```

## registryDependencies

Other registry items that must be installed alongside this one. Referenced by item name within the same or a resolved registry.

`registryDependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-registry-dependencies.md "undefined#/properties/items/items/properties/registryDependencies")

### registryDependencies Type

`string[]`

### registryDependencies Examples

```json
"button"
```

```json
"utils"
```
