# 安装时机 Schema

```txt
undefined#/properties/items/items/properties/when
```

控制被动（自动）安装时该 item 何时被安装。"on-init" 表示 registry 初始化后立即安装；"on-depended" 表示仅在其他 item 依赖它时才安装。显式安装不受影响。

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                 |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [registry.schema.json\*](../../website/public/registry.schema.json "open original schema") |

## when Type

`string` ([安装时机](registry-properties-items-registry-item-properties-安装时机.md))

## when Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | :---------- |
| `"on-init"`     |             |
| `"on-depended"` |             |

## when Default Value

The default value is:

```json
"on-depended"
```

## when Examples

```json
"on-init"
```

```json
"on-depended"
```

```json
"on-init"
```

```json
"on-depended"
```
