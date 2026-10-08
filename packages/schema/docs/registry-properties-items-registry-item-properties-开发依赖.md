# 开发依赖 Schema

```txt
undefined#/properties/items/items/properties/devDependencies
```

仅用于开发或测试该 item 的 NPM 包，生产环境不需要。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## devDependencies Type

`string[]`

## devDependencies Examples

```json
"vitest^2.0.0"
```

```json
"@vue/test-utils@latest"
```
