# 版本 Schema

```txt
undefined#/properties/version
```

该 registry 的版本。建议使用兼容 semver 的字符串，便于消费方判断升级。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## version Type

`string` ([版本](registry-properties-版本.md))

## version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## version Examples

```json
"1.0.0"
```

```json
"2.1.3"
```
