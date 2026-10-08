# 依赖 Schema

```txt
undefined#/properties/items/items/properties/dependencies
```

该 item 运行时所需的 NPM 包。条目可带版本范围或 tag，例如 "vue^3.0.0" 或 "lodash\@latest"。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## dependencies Type

`string[]`

## dependencies Examples

```json
"vue^3.4.0"
```

```json
"class-variance-authority@latest"
```
