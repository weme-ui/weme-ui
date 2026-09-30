# Files Schema

```txt
undefined#/properties/items/items/properties/files
```

The files installed into the project for this item, each with its registry source path and project destination path.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../../lockfile.schema.json "open original schema") |

## files Type

`object[]` ([Installed file](lockfile-properties-items-installed-item-properties-files-installed-file.md))

## files Examples

```json
{
  "source": "button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```
