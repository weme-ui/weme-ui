# Registry 名称 Schema

```txt
undefined#/properties/registries/propertyNames
```

registry 的唯一名称，形式为 "owner/registry"。用于在生态中标识并解析该 registry。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [manifest.schema.json\*](../../website/public/manifest.schema.json "open original schema") |

## propertyNames Type

`string` ([Registry 名称](manifest-properties-registries-registry-名称.md))

## propertyNames Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^/]+\/[^/]+$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5E%2F%5D%2B%5C%2F%5B%5E%2F%5D%2B%24 "try regular expression with regexr.com")

## propertyNames Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```
