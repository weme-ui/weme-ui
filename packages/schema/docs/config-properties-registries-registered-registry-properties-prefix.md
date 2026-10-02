# Prefix Schema

```txt
undefined#/properties/registries/items/properties/prefix
```

An optional install prefix used to namespace this registry's items and avoid collisions when multiple registries are registered in the same project.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## prefix Type

`string` ([Prefix](config-properties-registries-registered-registry-properties-prefix.md))

## prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## prefix Examples

```json
"weme"
```
