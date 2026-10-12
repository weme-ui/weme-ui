<script lang="ts" setup>
import type { PasswordStrengthProps } from './password-strength.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { usePasswordStrength } from '~/composables/use-password-strength'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePasswordStrengthStyle } from './password-strength.style'

const props = withDefaults(defineProps<PasswordStrengthProps>(), {
  size: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')

const { options, checkPassword } = usePasswordStrength({
  options: props.options,
  messages: props.messages,
})

const strength = computed(() => checkPassword(props.password ?? ''))

const ui = computed(() => usePasswordStrengthStyle({
  size: props.size,
  unstyled: props.unstyled,
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    data-slot="password-strength"
    :data-disabled="toBoolDataAttrValue(disabled)"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot />

    <template v-if="!disabled">
      <div role="progressbar" :class="cn(ui.track(), props.ui?.track)">
        <div
          v-for="(_, key, index) in options"
          :key="`${key}`"
          role="presentation"
          :aria-valuenow="key"
          :class="cn(
            ui.indicator({ strength: strength && strength.diversity >= index ? strength.key : undefined }),
            props.ui?.indicator,
          )"
        />
      </div>

      <div v-if="showMessage" role="status" :aria-label="strength.message" :class="cn(ui.message(), props.ui?.message)">
        <slot name="message" :message="strength.message" :length="strength.length">
          {{ strength.message }}
        </slot>
      </div>
    </template>
  </Primitive>
</template>
