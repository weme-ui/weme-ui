<script lang="ts" setup>
import type { SwitchEmits, SwitchProps } from './switch.props'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { computed, watch } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useSwitchStyle } from './switch.style'

const props = withDefaults(defineProps<SwitchProps>(), {
  color: 'primary',
  checkedIcon: 'check',
  uncheckedIcon: 'close',
  loadingIcon: 'loading',
})

const emits = defineEmits<SwitchEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'class', 'ui', 'color', 'size', 'radius', 'icon', 'checkedIcon', 'uncheckedIcon', 'loadingIcon', 'loading')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, size, disabled, required } = useFormField<SwitchProps>(props)

const ui = computed(() => useSwitchStyle({
  color: props.color,
  size: size.value,
  radius: props.radius,
  disabled: toBoolValue(disabled.value),
  loading: toBoolValue(props.loading),
}))

watch(
  () => props.modelValue,
  (value) => {
    emits('change', !!value)
  },
)
</script>

<template>
  <SwitchRoot
    :id="id"
    v-slot="{ modelValue }"
    :name="name"
    :required="required"
    v-bind="forwarded"
    data-slot="switch"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <SwitchThumb data-slot="switch-thumb" :class="cn(ui.thumb(), props.ui?.thumb)">
      <Icon v-if="!!loading" :name="loadingIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      <slot v-else-if="!!$slots.icon || !!icon" name="icon" :checked="modelValue">
        <Icon
          v-if="!!icon"
          :name="modelValue ? checkedIcon : uncheckedIcon"
          :class="cn(ui.icon(), props.ui?.icon)"
          :data-state="modelValue ? 'checked' : 'unchecked'"
        />
      </slot>
    </SwitchThumb>
  </SwitchRoot>
</template>
