# Schema Schema

```txt
undefined#/properties/$schema
```

用于校验该 registry 配置的 JSON Schema URL。编辑器与工具链据此提供补全与校验。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## $schema Type

`string` ([Schema](registry-properties-schema.md))

## $schema Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

## $schema Default Value

The default value is:

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```

## $schema Examples

```json
"https://weme-ui.github.io/weme-ui/registry.schema.json"
```
