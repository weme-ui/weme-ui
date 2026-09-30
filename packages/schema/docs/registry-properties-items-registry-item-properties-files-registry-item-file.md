# Registry item file Schema

```txt
undefined#/properties/items/items/properties/files/items
```

Describes a single file that belongs to a registry item, including its source path, optional install target, type, and kind.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [registry.schema.json\*](../../../registry.schema.json "open original schema") |

## items Type

`object` ([Registry item file](registry-properties-items-registry-item-properties-files-registry-item-file.md))

# items Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                   |
| :---------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-item-type.md "undefined#/properties/items/items/properties/files/items/properties/type")     |
| [kind](#kind)     | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-file-kind.md "undefined#/properties/items/items/properties/files/items/properties/kind")     |
| [path](#path)     | `string` | Required | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-source-path.md "undefined#/properties/items/items/properties/files/items/properties/path")   |
| [target](#target) | `string` | Optional | cannot be null | [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-target-path.md "undefined#/properties/items/items/properties/files/items/properties/target") |

## type

The category of the registry item. Determines how the item is classified and which default install path it uses when resolving files.

`type`

* is optional

* Type: `string` ([Item type](registry-properties-items-registry-item-properties-files-registry-item-file-properties-item-type.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-item-type.md "undefined#/properties/items/items/properties/files/items/properties/type")

### type Type

`string` ([Item type](registry-properties-items-registry-item-properties-files-registry-item-file-properties-item-type.md))

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
"component"
```

```json
"composable"
```

```json
"ui"
```

```json
"block"
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

## kind

The role of a file within a registry item. "file" is the primary source; "doc", "example", and "test" mark supporting documentation, demos, and tests respectively.

`kind`

* is optional

* Type: `string` ([File kind](registry-properties-items-registry-item-properties-files-registry-item-file-properties-file-kind.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-file-kind.md "undefined#/properties/items/items/properties/files/items/properties/kind")

### kind Type

`string` ([File kind](registry-properties-items-registry-item-properties-files-registry-item-file-properties-file-kind.md))

### kind Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"file"`    |             |
| `"doc"`     |             |
| `"example"` |             |
| `"test"`    |             |

### kind Default Value

The default value is:

```json
"file"
```

### kind Examples

```json
"file"
```

```json
"doc"
```

```json
"example"
```

```json
"test"
```

## path

The path to the file within the registry package. Relative to the registry root.

`path`

* is required

* Type: `string` ([Source path](registry-properties-items-registry-item-properties-files-registry-item-file-properties-source-path.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-source-path.md "undefined#/properties/items/items/properties/files/items/properties/path")

### path Type

`string` ([Source path](registry-properties-items-registry-item-properties-files-registry-item-file-properties-source-path.md))

### path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### path Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```

## target

The destination path where this file should be written when the item is installed. If omitted, the path is derived from the registry default paths and the item type.

`target`

* is optional

* Type: `string` ([Target path](registry-properties-items-registry-item-properties-files-registry-item-file-properties-target-path.md))

* cannot be null

* defined in: [Registry configuration](registry-properties-items-registry-item-properties-files-registry-item-file-properties-target-path.md "undefined#/properties/items/items/properties/files/items/properties/target")

### target Type

`string` ([Target path](registry-properties-items-registry-item-properties-files-registry-item-file-properties-target-path.md))

### target Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### target Examples

```json
"components/ui/button.vue"
```
