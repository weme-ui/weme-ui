# 仓库 Schema

```txt
undefined#/properties/items/items/properties/repo
```

安装该 item 时解析所得的 registry 源仓库。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## repo Type

`string` ([仓库](lockfile-properties-items-已安装-item-properties-仓库.md))

## repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```

```json
"https://github.com/weme-ui/weme-ui"
```
