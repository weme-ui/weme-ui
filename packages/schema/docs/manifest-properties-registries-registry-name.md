# Registry name Schema

```txt
undefined#/properties/registries/propertyNames
```

The unique name of the registry in the form "owner/registry". Used to identify and resolve this registry across the ecosystem.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [manifest.schema.json\*](../../../docs/manifest.schema.json "open original schema") |

## propertyNames Type

`string` ([Registry name](manifest-properties-registries-registry-name.md))

## propertyNames Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^A-Z]*(\/)[^A-Z]*$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5EA-Z%5D*\(%5C%2F\)%5B%5EA-Z%5D*%24 "try regular expression with regexr.com")

## propertyNames Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```
