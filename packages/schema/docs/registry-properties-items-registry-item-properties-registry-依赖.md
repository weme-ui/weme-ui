# Registry 依赖 Schema

```txt
undefined#/properties/items/items/properties/registryDependencies
```

必须与该 item 一并安装的其他 registry item。按同一或已解析 registry 内的 item 名称引用。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## registryDependencies Type

`string[]`

## registryDependencies Examples

```json
"button"
```

```json
"utils"
```
