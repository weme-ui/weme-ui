# usePasswordStrength

按长度与字符多样性评估密码强度，返回合并后的阈值与 `checkPassword`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-password-strength
```

## Options

`UsePasswordStrengthOptions`：

| 字段       | 类型                                                                   | 说明                                                                                     |
| ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `options`  | `Partial<Omit<PasswordStrengthOptions, 'tooWeak'>>`                    | 覆盖 `weak` / `medium` / `strong` 的 `minLength`、`minDiversity`（`tooWeak` 固定为默认） |
| `messages` | `Partial<Record<'tooWeak' \| 'weak' \| 'medium' \| 'strong', string>>` | 覆盖各档文案                                                                             |

默认档位：

| key       | minLength | minDiversity |
| --------- | --------- | ------------ |
| `tooWeak` | `0`       | `0`          |
| `weak`    | `8`       | `2`          |
| `medium`  | `10`      | `3`          |
| `strong`  | `12`      | `4`          |

默认文案：`Too weak` / `Weak` / `Medium` / `Strong`。

多样性规则键：`lowercase`、`uppercase`、`number`、`symbol`。

## Usage

```ts
import { usePasswordStrength } from '~/composables/use-password-strength'

const { options, checkPassword } = usePasswordStrength({
  messages: { strong: '很强' },
})

const result = checkPassword('Secret123!')
// result.key / message / diversity / contains / length
```

## Returns

| 字段            | 类型                                                    | 说明                      |
| --------------- | ------------------------------------------------------- | ------------------------- |
| `options`       | 合并后的强度档位表                                      | 默认与用户 `options` 合并 |
| `checkPassword` | `(userPassword: string) => PasswordStrengthCheckResult` | 评估单次密码              |

`checkPassword` 在满足多项档位时取**最强**一档（`tooWeak` → `strong` 顺序的最后一项）。

## Types

### `UsePasswordStrengthOptions`

见上方 Options。

### `PasswordStrengthCheckResult`

| 字段        | 类型                                                     | 说明                 |
| ----------- | -------------------------------------------------------- | -------------------- |
| `diversity` | `number`                                                 | 命中规则数量相关索引 |
| `key`       | `'tooWeak' \| 'weak' \| 'medium' \| 'strong'`            | 强度档               |
| `contains`  | `('lowercase' \| 'uppercase' \| 'number' \| 'symbol')[]` | 命中的字符类         |
| `message`   | `string`                                                 | 对应文案             |
| `length`    | `number`                                                 | 密码长度             |
