# 已安装文件 Schema

```txt
undefined#/properties/items/items/properties/files/items
```

锁定文件中记录的单个文件：来自 registry 的源路径，以及写入项目的目标路径。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [lockfile.schema.json\*](../../website/public/lockfile.schema.json "open original schema") |

## items Type

`object` ([已安装文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件.md))

## items Examples

```json
{
  "source": "button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```

# items Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                      |
| :---------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [source](#source) | `string` | Required | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-源路径.md "undefined#/properties/items/items/properties/files/items/properties/source") |
| [dest](#dest)     | `string` | Required | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-目标路径.md "undefined#/properties/items/items/properties/files/items/properties/dest")  |

## source

文件在 registry 包内的原始路径，相对于 registry 根目录。

`source`

* is required

* Type: `string` ([源路径](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-源路径.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-源路径.md "undefined#/properties/items/items/properties/files/items/properties/source")

### source Type

`string` ([源路径](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-源路径.md))

### source Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### source Examples

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

## dest

安装该 item 时文件在项目中写入的路径。

`dest`

* is required

* Type: `string` ([目标路径](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-目标路径.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-目标路径.md "undefined#/properties/items/items/properties/files/items/properties/dest")

### dest Type

`string` ([目标路径](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-目标路径.md))

### dest Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### dest Examples

```json
"src/components/ui/button/button.vue"
```

```json
"src/composables/use-toggle/index.ts"
```
