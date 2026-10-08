# 前缀 Schema

```txt
undefined#/properties/items/items/properties/prefix
```

安装该 item 时应用的前缀，用于在同一项目存在多个 registry 时隔离文件命名空间。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## prefix Type

`string` ([前缀](lockfile-properties-items-已安装-item-properties-前缀.md))

## prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## prefix Examples

```json
"weme"
```

```json
"weme"
```
