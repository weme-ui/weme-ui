# 目标路径 Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/target
```

安装该 item 时文件应写入的目标路径。省略时根据 registry 默认路径与 item type 推导。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## target Type

`string` ([目标路径](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-目标路径.md))

## target Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## target Examples

```json
"components/ui/button.vue"
```
