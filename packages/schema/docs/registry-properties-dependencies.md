# Dependencies Schema

```txt
undefined#/properties/dependencies
```

Default runtime NPM packages installed into a consumer project when this registry is initialized. Unlike item-level dependencies, these apply once for the whole registry. Entries may include a version range or tag, e.g. "vue^3.4.0" or "lodash\@latest".

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../../docs/registry.schema.json "open original schema") |

## dependencies Type

`string[]`

## dependencies Examples

```json
"vue^3.4.0"
```

```json
"class-variance-authority@latest"
```
