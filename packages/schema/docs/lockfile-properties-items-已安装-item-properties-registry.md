# Registry Schema

```txt
undefined#/properties/items/items/properties/registry
```

该已安装 item 来源的 registry，形式为 "owner/registry"。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## registry Type

`string` ([Registry](lockfile-properties-items-已安装-item-properties-registry.md))

## registry Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^/]+\/[^/]+$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5E%2F%5D%2B%5C%2F%5B%5E%2F%5D%2B%24 "try regular expression with regexr.com")

## registry Examples

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```

```json
"weme-ui/slim"
```

```json
"weme-ui/core"
```

```json
"weme-ui/slim"
```
