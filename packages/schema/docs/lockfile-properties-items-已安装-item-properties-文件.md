# 文件 Schema

```txt
undefined#/properties/items/items/properties/files
```

为该 item 写入项目的文件列表，每项含 registry 源路径与项目目标路径。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## files Type

`object[]` ([已安装文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件.md))

## files Examples

```json
{
  "source": "button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```
