# Registered registry Schema

```txt
undefined#/properties/registries/items
```

A registry registered with the project. Identifies which registry to use and optionally where to fetch it from and under which prefix to install its items.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [config.schema.json\*](../../website/public/config.schema.json "open original schema") |

## items Type

`object` ([Registered registry](config-properties-registries-registered-registry.md))

## items Examples

```json
{
  "repo": "https://github.com/weme-ui/weme-ui",
  "registry": "weme-ui/slim",
  "prefix": "weme"
}
```

# items Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                    |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [repo](#repo)         | `string` | Optional | cannot be null | [Project configuration](config-properties-registries-registered-registry-properties-repository.md "undefined#/properties/registries/items/properties/repo")   |
| [registry](#registry) | `string` | Required | cannot be null | [Project configuration](config-properties-registries-registered-registry-properties-registry.md "undefined#/properties/registries/items/properties/registry") |
| [prefix](#prefix)     | `string` | Optional | cannot be null | [Project configuration](config-properties-registries-registered-registry-properties-prefix.md "undefined#/properties/registries/items/properties/prefix")     |

## repo

The source repository that hosts the registry. Used to resolve and fetch registry contents when the registry is not already available locally.

`repo`

* is optional

* Type: `string` ([Repository](config-properties-registries-registered-registry-properties-repository.md))

* cannot be null

* defined in: [Project configuration](config-properties-registries-registered-registry-properties-repository.md "undefined#/properties/registries/items/properties/repo")

### repo Type

`string` ([Repository](config-properties-registries-registered-registry-properties-repository.md))

### repo Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### repo Examples

```json
"https://github.com/weme-ui/weme-ui"
```

## registry

The registry to register with this project, in the form "owner/registry".

`registry`

* is required

* Type: `string` ([Registry](config-properties-registries-registered-registry-properties-registry.md))

* cannot be null

* defined in: [Project configuration](config-properties-registries-registered-registry-properties-registry.md "undefined#/properties/registries/items/properties/registry")

### registry Type

`string` ([Registry](config-properties-registries-registered-registry-properties-registry.md))

### registry Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[^A-Z]*(\/)[^A-Z]*$
```

[try pattern](https://regexr.com/?expression=%5E%5B%5EA-Z%5D*\(%5C%2F\)%5B%5EA-Z%5D*%24 "try regular expression with regexr.com")

### registry Examples

```json
"weme-ui/slim"
```

## prefix

An optional install prefix used to namespace this registry's items and avoid collisions when multiple registries are registered in the same project.

`prefix`

* is optional

* Type: `string` ([Prefix](config-properties-registries-registered-registry-properties-prefix.md))

* cannot be null

* defined in: [Project configuration](config-properties-registries-registered-registry-properties-prefix.md "undefined#/properties/registries/items/properties/prefix")

### prefix Type

`string` ([Prefix](config-properties-registries-registered-registry-properties-prefix.md))

### prefix Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### prefix Examples

```json
"weme"
```
