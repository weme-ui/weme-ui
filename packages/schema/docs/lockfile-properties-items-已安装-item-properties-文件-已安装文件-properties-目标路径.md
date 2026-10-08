# 目标路径 Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/dest
```

安装该 item 时文件在项目中写入的路径。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## dest Type

`string` ([目标路径](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-目标路径.md))

## dest Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## dest Examples

```json
"src/components/ui/button/button.vue"
```

```json
"src/composables/use-toggle/index.ts"
```
