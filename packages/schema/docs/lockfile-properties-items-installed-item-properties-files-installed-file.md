# Installed file Schema

```txt
undefined#/properties/items/items/properties/files/items
```

A single file recorded in the lock file: where it came from in the registry, and where it was installed in the project.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [lockfile.schema.json\*](../../../lockfile.schema.json "open original schema") |

## items Type

`object` ([Installed file](lockfile-properties-items-installed-item-properties-files-installed-file.md))

## items Examples

```json
{
  "source": "button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```

# items Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                              |
| :---------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [source](#source) | `string` | Required | cannot be null | [Project lock file](lockfile-properties-items-installed-item-properties-files-installed-file-properties-source-path.md "undefined#/properties/items/items/properties/files/items/properties/source")    |
| [dest](#dest)     | `string` | Required | cannot be null | [Project lock file](lockfile-properties-items-installed-item-properties-files-installed-file-properties-destination-path.md "undefined#/properties/items/items/properties/files/items/properties/dest") |

## source

The original path of the file inside the registry package, relative to the registry root.

`source`

* is required

* Type: `string` ([Source path](lockfile-properties-items-installed-item-properties-files-installed-file-properties-source-path.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items-installed-item-properties-files-installed-file-properties-source-path.md "undefined#/properties/items/items/properties/files/items/properties/source")

### source Type

`string` ([Source path](lockfile-properties-items-installed-item-properties-files-installed-file-properties-source-path.md))

### source Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### source Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```

## dest

The path where this file was written in the project when the item was installed.

`dest`

* is required

* Type: `string` ([Destination path](lockfile-properties-items-installed-item-properties-files-installed-file-properties-destination-path.md))

* cannot be null

* defined in: [Project lock file](lockfile-properties-items-installed-item-properties-files-installed-file-properties-destination-path.md "undefined#/properties/items/items/properties/files/items/properties/dest")

### dest Type

`string` ([Destination path](lockfile-properties-items-installed-item-properties-files-installed-file-properties-destination-path.md))

### dest Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### dest Examples

```json
"src/components/ui/button/button.vue"
```

```json
"src/composables/use-toggle/index.ts"
```
