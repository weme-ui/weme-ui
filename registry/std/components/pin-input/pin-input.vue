<script lang="ts" setup>
import type { PinInputEmits, PinInputProps } from './pin-input.props'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePinInputStyle } from './pin-input.style'

const props = withDefaults(defineProps<PinInputProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'sm',
  length: 4,
  placeholder: '○',
  otp: true,
})

const emits = defineEmits<PinInputEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'length')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => usePinInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  invalid: toBoolValue(props.invalid),
  disabled: toBoolValue(props.disabled),
}))

const focused = ref(-1)
</script>

<template>
  <PinInputRoot v-bind="forwarded" data-slot="pin-input" :class="cn(ui.root(), props.ui?.root, props.class)">
    <PinInputInput
      v-for="(id, index) in length"
      :key="id"
      :index="index"
      data-slot="pin-input-value"
      :class="cn(ui.input({ focused: index === focused }), props.ui?.input)"
      :aria-required="toBoolValue(required) || undefined"
      :aria-invalid="toBoolValue(invalid) || undefined"
      :data-focused="toBoolDataAttrValue(index === focused)"
      @focus="focused = index"
      @blur="focused = -1"
    />
  </PinInputRoot>
</template>
