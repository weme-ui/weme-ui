# 仓库 Schema

```txt
undefined#/properties/registries/items/properties/repo
```

托管该 registry 的源仓库。当 registry 本地尚不可用时，用于解析并拉取内容。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## repo Type

`string` ([仓库](config-properties-registries-已注册的-registry-properties-仓库.md))

## repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```
