<script lang="ts" setup>
import type { PinInputEmits, PinInputProps } from './pin-input.props'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePinInputStyle } from './pin-input.style'

const props = withDefaults(defineProps<PinInputProps>(), {
  variant: 'soft',
  length: 4,
  placeholder: '○',
  otp: true,
})

const emits = defineEmits<PinInputEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'disabled', 'class', 'ui', 'length')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, size, radius, disabled, required } = useFormField<PinInputProps>(props)

const ui = computed(() => usePinInputStyle({
  variant: props.variant,
  size: size.value,
  radius: radius.value,
  invalid: toBoolValue(props.invalid),
  disabled: toBoolValue(disabled.value),
}))

const focused = ref(-1)
</script>

<template>
  <PinInputRoot
    :id="id"
    :name="name"
    :required="required"
    :disabled="disabled"
    v-bind="forwarded"
    data-slot="pin-input"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <PinInputInput
      v-for="(idx, index) in length"
      :key="idx"
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
