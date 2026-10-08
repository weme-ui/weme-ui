# 依赖 Schema

```txt
undefined#/properties/dependencies
```

以该 registry 初始化消费方项目时默认安装的运行时 NPM 包。与 item 级依赖不同，这些依赖对整个 registry 只应用一次。条目可带版本范围或 tag，例如 "vue^3.4.0" 或 "lodash\@latest"。

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
