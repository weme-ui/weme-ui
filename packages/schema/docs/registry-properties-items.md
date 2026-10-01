# Items Schema

```txt
undefined#/properties/items
```

The catalog of registry items published by this registry. Each item describes an installable unit such as a component, block, or utility.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../docs/registry.schema.json "open original schema") |

## items Type

`object[]` ([Registry item](registry-properties-items-registry-item.md))

## items Examples

```json
{
  "name": "button",
  "title": "Button",
  "description": "A button component"
}
```
