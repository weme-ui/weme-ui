# 源路径 Schema

```txt
undefined#/properties/items/items/properties/files/items/properties/source
```

文件在 registry 包内的原始路径，相对于 registry 根目录。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## source Type

`string` ([源路径](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-源路径.md))

## source Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## source Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```
