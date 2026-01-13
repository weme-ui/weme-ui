<script lang="ts" setup>
import type { SliderEmits, SliderProps } from './slider.props'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Tooltip from '../tooltip/tooltip.vue'
import { useSliderStyle } from './slider.style'

const props = defineProps<SliderProps>()
const emits = defineEmits<SliderEmits>()
const delegated = reactiveOmit(props, 'name', 'disabled', 'required', 'class', 'ui', 'color', 'size', 'radius', 'tooltip')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, size, radius, disabled, required } = useFormField<SliderProps>(props)

const thumbs = computed(() => props.modelValue || props.defaultValue || [0])

const ui = computed(() => useSliderStyle({
  color: props.color,
  orientation: props.orientation,
  size: size.value,
  radius: radius.value,
  disabled: toBoolValue(disabled.value),
}))
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    :id="id"
    data-slot="slider"
    :name="name"
    :required="required"
    :disabled="disabled"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <SliderTrack data-slot="slider-track" :class="cn(ui.track(), props.ui?.track)">
      <SliderRange data-slot="slider-range" :class="cn(ui.range(), props.ui?.range)" />
    </SliderTrack>

    <template v-for="idx in thumbs.length" :key="idx">
      <Tooltip
        v-if="props.tooltip"
        v-bind="typeof props.tooltip === 'object' ? props.tooltip : undefined"
        :trigger="{ asChild: true }"
        :delay-duration="20"
        :text="thumbs[idx - 1]?.toString()"
        disable-closing-trigger
        arrow
      >
        <SliderThumb as="button" data-slot="slider-thumb" :class="cn(ui.thumb(), props.ui?.thumb)">
          <slot name="thumb" />
        </SliderThumb>
      </Tooltip>
      <SliderThumb v-else data-slot="slider-thumb" :class="cn(ui.thumb(), props.ui?.thumb)">
        <slot name="thumb" />
      </SliderThumb>
    </template>
  </SliderRoot>
</template>
