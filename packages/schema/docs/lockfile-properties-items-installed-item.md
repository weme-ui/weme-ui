# Installed item Schema

```txt
undefined#/properties/items/items
```

A registry item that has been installed into the project. Records which registry it came from and which files were written.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [lockfile.schema.json\*](../../../docs/lockfile.schema.json "open original schema") |

## items Type

`object` ([Installed item](lockfile-properties-items-installed-item.md))

## items Examples

```json
{
  "registry": "weme-ui/slim",
  "repo": "https://github.com/weme-ui/weme-ui",
  "prefix": "weme",
  "files": [
    {
      "source": "button/button.vue",
      "dest": "src/components/ui/button/button.vue"
    }
  ]
}
```

# items Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                   |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| [registry](#registry) | `string` | Required | cannot be null | [Project lock file](lockfile-properties-items-installed-item-properties-registry.md "undefined#/properties/items/items/properties/registry") |
| [repo](#repo)         | `string` | Optional | cannot be null | [Project lock file](lockfile-properties-items-installed-item-properties-repository.md "undefined#/properties/items/items/properties/repo")   |
| [prefix](#prefix)     | `string` | Optional | cannot be null | [Project lock file](lockfile-properties-items-installed-item-properties-prefix.md "undefined#/properties/items/items/properties/prefix")     |
| [files](#files)       | `array`  | Required | cannot be null | [Project lock file](lockfile-properties-items-installed-item-properties-files.md "undefined#/properties/items/items/properties/files")       |

## registry

The registry this installed item came from, in the form "owner/registry".

`registry`

* is required

* Type: `string` ([Registry](lockfile-properties-items-installed-item-properties-registry.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items-installed-item-properties-registry.md "undefined#/properties/items/items/properties/registry")

### registry Type

`string` ([Registry](lockfile-properties-items-installed-item-properties-registry.md))

### registry Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^A-Z]*(\/)[^A-Z]*$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5EA-Z%5D*\(%5C%2F\)%5B%5EA-Z%5D*%24 "try regular expression with regexr.com")

### registry Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```

## repo

The source repository the registry was resolved from when this item was installed.

`repo`

* is optional

* Type: `string` ([Repository](lockfile-properties-items-installed-item-properties-repository.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items-installed-item-properties-repository.md "undefined#/properties/items/items/properties/repo")

### repo Type

`string` ([Repository](lockfile-properties-items-installed-item-properties-repository.md))

### repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```

## prefix

The install prefix that was applied to this item, used to namespace files when multiple registries are present in the same project.

`prefix`

* is optional

* Type: `string` ([Prefix](lockfile-properties-items-installed-item-properties-prefix.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items-installed-item-properties-prefix.md "undefined#/properties/items/items/properties/prefix")

### prefix Type

`string` ([Prefix](lockfile-properties-items-installed-item-properties-prefix.md))

### prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### prefix Examples

```json
"weme"
```

## files

The files installed into the project for this item, each with its registry source path and project destination path.

`files`

* is required

* Type: `object[]` ([Installed file](lockfile-properties-items-installed-item-properties-files-installed-file.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items-installed-item-properties-files.md "undefined#/properties/items/items/properties/files")

### files Type

`object[]` ([Installed file](lockfile-properties-items-installed-item-properties-files-installed-file.md))

### files Examples

```json
{
  "source": "button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```
