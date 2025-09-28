<script lang="ts" setup>
import type { SwitchEmits, SwitchProps } from './switch.props'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import Icon from '../icon/icon.vue'
import { useSwitchStyle } from './switch.style'

const props = withDefaults(defineProps<SwitchProps>(), {
  color: 'accent',
  radius: 'full',
  size: 'md',
})

const emits = defineEmits<SwitchEmits>()
const delegated = reactiveOmit(props, 'class', 'color', 'radius', 'size', 'loading', 'ui', 'checkedIcon', 'uncheckedIcon')
const forwarded = useForwardPropsEmits(delegated, emits)

const isDisabled = computed(() => props.loading || props.disabled)
const ui = computed(() => useSwitchStyle(props))
</script>

<template>
  <SwitchRoot
    v-slot="{ modelValue }"
    v-bind="forwarded"
    :disabled="isDisabled"
    :class="ui.base({ class: [props.class, props.ui?.base] })"
  >
    <SwitchThumb :class="ui.thumb({ class: props.ui?.thumb })">
      <Icon v-if="loading" name="loading" class="animate-spin" />
      <slot v-else name="icon" :checked="modelValue">
        <Icon v-if="checkedIcon && modelValue" :name="checkedIcon" />
        <Icon v-else-if="uncheckedIcon && !modelValue" :name="uncheckedIcon" />
      </slot>
    </SwitchThumb>
  </SwitchRoot>
</template>
