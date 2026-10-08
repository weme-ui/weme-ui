# 开发依赖 Schema

```txt
undefined#/properties/devDependencies
```

以该 registry 初始化消费方项目时默认安装的开发用 NPM 包。适用于 registry 共享的工具链（例如测试辅助），而非应用运行时所需的包。条目可带版本范围或 tag。

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
