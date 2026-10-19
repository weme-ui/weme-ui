<script lang="ts" setup>
import type { PasswordInputEmits, PasswordInputProps } from './password-input.props'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Input from '../input/input.vue'
import { usePasswordInputStyle } from './password-input.style'

const props = withDefaults(defineProps<PasswordInputProps>(), {
  visibleIcon: 'ri:eye-line',
  invisibleIcon: 'ri:eye-off-line',
})

const emits = defineEmits<PasswordInputEmits>()
const delegated = reactiveOmit(props, 'visibleIcon', 'invisibleIcon', 'toggleVisibility', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const visible = defineModel<boolean>('visible', { default: false })

const type = computed(() => visible.value ? 'text' : 'password')

const ui = computed(() => usePasswordInputStyle({
  variant: props.variant,
  radius: props.radius,
  size: props.size,
  unstyled: toBoolValue(props.unstyled),
}))

function handleToggleVisibility() {
  visible.value = !visible.value
}
</script>

<template>
  <Input
    v-bind="forwarded"
    :data-slot="$attrs['data-slot'] ?? 'password-input'"
    :type="type"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot />

    <template v-if="toggleVisibility" #suffix>
      <slot name="visibility" :visible="visible">
        <button
          type="button"
          aria-label="Toggle password visibility"
          :class="cn(ui.visibility(), props.ui?.visibility)"
          @click="handleToggleVisibility"
        >
          <Icon :name="visible ? props.visibleIcon : props.invisibleIcon" />
        </button>
      </slot>
    </template>
  </Input>
</template>
