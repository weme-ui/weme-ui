<script lang="ts" setup>
import type { PasswordStrengthMeterOptions, PasswordStrengthMeterProps } from './password-strength-meter.props'
import { reactivePick } from '@vueuse/core'
import { passwordStrength } from 'check-password-strength'
import { Primitive } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePasswordStrengthMeterStyle } from './password-strength-meter.style'

const props = withDefaults(defineProps<PasswordStrengthMeterProps>(), { disabled: false })
const delegated = reactivePick(props, 'as', 'asChild')

const { t } = useLocale()

const options = computed<PasswordStrengthMeterOptions>(() => {
  return [
    { id: 0, value: 'tooWeak', minDiversity: 0, minLength: 0 },
    { id: 1, value: 'weak', minDiversity: props.options?.weak.minDiversity ?? 0, minLength: props.options?.weak.minLength ?? 6 },
    { id: 2, value: 'medium', minDiversity: props.options?.medium.minDiversity ?? 2, minLength: props.options?.medium.minLength ?? 8 },
    { id: 3, value: 'strong', minDiversity: props.options?.strong.minDiversity ?? 4, minLength: props.options?.strong.minLength ?? 10 },
  ]
})

const password = toRef(() => props.value ?? '')
const strength = computed(() => {
  if (!password.value)
    return null

  return passwordStrength(password.value, options.value)
})

const ui = computed(() => usePasswordStrengthMeterStyle({
  size: props.size,
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    data-slot="password-strength-meter"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot />
    <template v-if="toBoolValue(disabled) !== true && options?.length">
      <div data-slot="password-strength-meter-bar" role="progressbar" :class="cn(ui.bar(), props.ui?.bar)">
        <template v-for="option in options" :key="option.id">
          <div
            data-slot="password-strength-meter-indicator"
            role="presentation"
            :class="cn(
              ui.indicator({
                strength: strength && option.id <= strength?.id
                  ? strength?.value as any
                  : undefined,
              }),
              props.ui?.indicator,
            )"
          />
        </template>
      </div>
      <div
        v-if="toBoolValue(hiddenLabel) !== true"
        data-slot="password-strength-meter-label"
        :class="cn(ui.label(), props.ui?.label)"
      >
        <slot name="label" v-bind="{ strength: strength?.value }">
          {{ strength ? t(`passwordStrengthMeter.${strength.value}`) : '' }}
        </slot>
      </div>
    </template>
  </Primitive>
</template>
