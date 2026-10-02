# Dev dependencies Schema

```txt
undefined#/properties/devDependencies
```

Default development-only NPM packages installed into a consumer project when this registry is initialized. Use for tooling shared across the registry (e.g. test helpers), not for packages required at application runtime. Entries may include a version range or tag.

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
