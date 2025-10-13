<script lang="ts" setup>
import type { SliderEmits, SliderProps } from './slider.props'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Tooltip from '../tooltip/tooltip.vue'
import { useSliderStyle } from './slider.style'

const props = withDefaults(defineProps<SliderProps>(), {
  color: 'accent',
  orientation: 'horizontal',
  size: 'md',
  min: 0,
  max: 100,
  step: 1,
  util: '',
})

const emits = defineEmits<SliderEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'color', 'size', 'tooltip', 'util')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useSliderStyle({
  ...props,
  disabled: toBoolValue(props.disabled),
}))
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    :class="ui.base({ class: cn(props.class, props.ui?.base) })"
    @value-commit="emits('change', modelValue!)"
  >
    <SliderTrack :class="ui.track({ class: props.ui?.track })">
      <SliderRange :class="ui.range({ class: props.ui?.range })" />
    </SliderTrack>

    <template v-for="idx in (modelValue || defaultValue)?.length" :key="idx">
      <Tooltip
        v-if="tooltip"
        :content="`${(modelValue || defaultValue)?.[idx - 1]}${util ? ` ${util}` : ''}`"
        disable-closing-trigger
        show-arrow
      >
        <SliderThumb :class="ui.thumb({ class: props.ui?.thumb })" />
      </Tooltip>
      <SliderThumb v-else :class="ui.thumb({ class: props.ui?.thumb })" />
    </template>
  </SliderRoot>
</template>
