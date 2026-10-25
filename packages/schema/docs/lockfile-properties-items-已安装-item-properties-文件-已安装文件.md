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
  "source": "components/button/button.vue",
  "dest": "src/components/ui/button/button.vue"
}
```

# items Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                      |
| :---------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [kind](#kind)     | `string` | Optional | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-文件种类.md "undefined#/properties/items/items/properties/files/items/properties/kind")  |
| [source](#source) | `string` | Required | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-源路径.md "undefined#/properties/items/items/properties/files/items/properties/source") |
| [dest](#dest)     | `string` | Required | cannot be null | [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-目标路径.md "undefined#/properties/items/items/properties/files/items/properties/dest")  |

## kind

文件在 registry item 中的角色。"file" 为主源码；"doc"、"example"、"test" 分别标记配套文档、示例与测试。

`kind`

* is optional

* Type: `string` ([文件种类](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-文件种类.md))

* cannot be null

* defined in: [项目锁定文件](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-文件种类.md "undefined#/properties/items/items/properties/files/items/properties/kind")

### kind Type

`string` ([文件种类](lockfile-properties-items-已安装-item-properties-文件-已安装文件-properties-文件种类.md))

### kind Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"file"`    |             |
| `"doc"`     |             |
| `"example"` |             |
| `"test"`    |             |

### kind Default Value

The default value is:

```json
"file"
```

### kind Examples

```json
"file"
```

```json
"doc"
```

```json
"example"
```

```json
"test"
```

```json
"file"
```

```json
"doc"
```

```json
"example"
```

```json
"test"
```

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
"components/button/button.vue"
```

```json
"composables/use-toggle.ts"
```

```json
"components/button/button.vue"
```

```json
"composables/use-toggle.ts"
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
