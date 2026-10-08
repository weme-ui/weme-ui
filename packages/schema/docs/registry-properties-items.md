# Items Schema

```txt
undefined#/properties/items
```

该 registry 发布的 item 目录。每个 item 描述一个可安装单元，例如 component、block 或工具。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## items Type

`object[]` ([Registry item](registry-properties-items-registry-item.md))

## items Examples

```json
{
  "name": "button",
  "title": "Button",
  "description": "按钮 component"
}
```
