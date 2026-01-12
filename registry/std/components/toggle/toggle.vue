<script lang="ts" setup>
import type { ToggleEmits, ToggleProps } from './toggle.props'
import { reactivePick } from '@vueuse/core'
import { Toggle, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useToggleStyle } from './toggle.style'

const props = defineProps<ToggleProps>()
const emits = defineEmits<ToggleEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'defaultValue', 'modelValue')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, size, radius, disabled, required } = useFormField<ToggleProps>(props)

const ui = computed(() => useToggleStyle({
  color: props.color,
  variant: props.variant,
  size: size.value,
  radius: radius.value,
  disabled: toBoolValue(disabled.value),
}))
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :id="id"
    v-slot="{ state, pressed }"
    data-slot="toggle"
    :name="name"
    :disabled="disabled"
    :required="required"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot v-if="icon || offIcon || !!$slots.icon" name="icon" v-bind="{ state, pressed, disabled }">
      <Icon v-if="state === 'on' && icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
      <Icon v-else-if="state === 'off' && offIcon" :name="offIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      <Icon v-else-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
    <span
      v-if="label || !!$slots.default"
      data-slot="toggle-label"
      :data-state="state"
      :class="cn(ui.label(), props.ui?.label)"
    >
      <slot v-bind="{ state, pressed, disabled }">
        {{ label }}
      </slot>
    </span>
  </Toggle>
</template>
