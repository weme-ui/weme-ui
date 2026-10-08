# 排除 Schema

```txt
undefined#/properties/exclude
```

在解析或安装时忽略的 registry item 名称列表。适合临时隐藏未完成或已弃用的 item。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## exclude Type

`string[]`

## exclude Examples

```json
"button"
```

```json
"legacy-card"
```
