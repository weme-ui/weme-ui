# Registries Schema

```txt
undefined#/properties/registries
```

已向本项目注册的 registries。每项选择一个 registry，并可指定仓库来源与安装前缀。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## registries Type

`object[]` ([已注册的 Registry](config-properties-registries-已注册的-registry.md))

## registries Examples

```json
{
  "repo": "https://github.com/weme-ui/weme-ui",
  "registry": "weme-ui/slim",
  "prefix": "weme"
}
```
