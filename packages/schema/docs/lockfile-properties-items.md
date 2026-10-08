# Items Schema

```txt
undefined#/properties/items
```

当前已安装进项目的 registry items。用于在更新时追踪来源与已安装文件位置。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## items Type

`object[]` ([已安装 item](lockfile-properties-items-已安装-item.md))

## items Examples

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
