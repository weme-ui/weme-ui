# Registry item 文件 Schema

```txt
undefined#/properties/items/items/properties/files/items
```

描述属于某个 registry item 的单个文件，包括源路径、可选安装目标、type 与 kind。

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## items Type

`object` ([Registry item 文件](registry-properties-items-registry-item-properties-文件-registry-item-文件.md))

# items Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                            |
| :---------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)     | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-注册项类型.md "undefined#/properties/items/items/properties/files/items/properties/type")  |
| [kind](#kind)     | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-文件种类.md "undefined#/properties/items/items/properties/files/items/properties/kind")   |
| [path](#path)     | `string` | Required | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-源路径.md "undefined#/properties/items/items/properties/files/items/properties/path")    |
| [target](#target) | `string` | Optional | cannot be null | [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-目标路径.md "undefined#/properties/items/items/properties/files/items/properties/target") |

## type

registry item 的分类。决定如何归类该 item，以及解析文件时使用哪条默认安装路径。

`type`

* is optional

* Type: `string` ([注册项类型](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-注册项类型.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-注册项类型.md "undefined#/properties/items/items/properties/files/items/properties/type")

### type Type

`string` ([注册项类型](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-注册项类型.md))

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"component"`  |             |
| `"composable"` |             |
| `"ui"`         |             |
| `"block"`      |             |
| `"layout"`     |             |
| `"page"`       |             |
| `"util"`       |             |

### type Default Value

The default value is:

```json
"block"
```

### type Examples

```json
"component"
```

```json
"composable"
```

```json
"ui"
```

```json
"block"
```

```json
"layout"
```

```json
"page"
```

```json
"util"
```

## kind

文件在 registry item 中的角色。"file" 为主源码；"doc"、"example"、"test" 分别标记配套文档、示例与测试。

`kind`

* is optional

* Type: `string` ([文件种类](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-文件种类.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-文件种类.md "undefined#/properties/items/items/properties/files/items/properties/kind")

### kind Type

`string` ([文件种类](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-文件种类.md))

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

## path

文件在 registry 包内的路径，相对于 registry 根目录。

`path`

* is required

* Type: `string` ([源路径](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-源路径.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-源路径.md "undefined#/properties/items/items/properties/files/items/properties/path")

### path Type

`string` ([源路径](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-源路径.md))

### path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### path Examples

```json
"button/button.vue"
```

```json
"use-toggle/index.ts"
```

## target

安装该 item 时文件应写入的目标路径。省略时根据 registry 默认路径与 item type 推导。

`target`

* is optional

* Type: `string` ([目标路径](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-目标路径.md))

* cannot be null

* defined in: [Registry 配置](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-目标路径.md "undefined#/properties/items/items/properties/files/items/properties/target")

### target Type

`string` ([目标路径](registry-properties-items-registry-item-properties-文件-registry-item-文件-properties-目标路径.md))

### target Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### target Examples

```json
"components/ui/button.vue"
```
