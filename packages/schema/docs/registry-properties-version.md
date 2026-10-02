# Version Schema

```txt
undefined#/properties/version
```

The version of this registry. Prefer a semver-compatible string so consumers can reason about upgrades.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## version Type

`string` ([Version](registry-properties-version.md))

## version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## version Examples

```json
"1.0.0"
```

```json
"2.1.3"
```
