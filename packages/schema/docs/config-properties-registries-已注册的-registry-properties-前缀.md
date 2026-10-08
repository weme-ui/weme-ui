# 前缀 Schema

```txt
undefined#/properties/registries/items/properties/prefix
```

可选的安装前缀，用于为该 registry 的 items 做命名空间隔离，避免同一项目注册多个 registry 时发生冲突。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## prefix Type

`string` ([前缀](config-properties-registries-已注册的-registry-properties-前缀.md))

## prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## prefix Examples

```json
"weme"
```
