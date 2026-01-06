<script lang="ts" setup>
import type { SwitchEmits, SwitchProps } from './switch.props'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useSwitchStyle } from './switch.style'

const props = withDefaults(defineProps<SwitchProps>(), {
  color: 'primary',
  size: 'md',
  radius: 'full',
  checkedIcon: 'check',
  uncheckedIcon: 'close',
  loadingIcon: 'loading',
})

const emits = defineEmits<SwitchEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'color', 'size', 'radius', 'icon', 'checkedIcon', 'uncheckedIcon', 'loadingIcon', 'loading')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useSwitchStyle({
  color: props.color,
  size: props.size,
  radius: props.radius,
  disabled: toBoolValue(props.disabled),
  loading: toBoolValue(props.loading),
}))
</script>

<template>
  <SwitchRoot
    v-slot="{ modelValue }"
    v-bind="forwarded"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    data-slot="switch"
  >
    <SwitchThumb :class="cn(ui.thumb(), props.ui?.thumb)" data-slot="switch-thumb">
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
