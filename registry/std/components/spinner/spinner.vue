<script lang="ts" setup>
import type { SpinnerProps } from './spinner.props'
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Overlay from '../overlay/overlay.vue'
import { useSpinnerStyle } from './spinner.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SpinnerProps>(), { icon: 'loading' })
const delegated = reactivePick(props, 'as', 'asChild')
const slots = useSlots()
const overlay = computed(() => slots.default?.() !== undefined)

const ui = computed(() => useSpinnerStyle({
  ...props,
  overlay: overlay.value,
}))

const [
  DefineLoading,
  ReuseLoading,
] = createReusableTemplate()
</script>

<template>
  <DefineLoading>
    <Icon :name="icon" :class="cn(ui.indicator(), props.ui?.indicator)" />
    <slot name="description">
      <p v-if="description" data-slot="spinner-description" :class="cn(ui.description(), props.ui?.description)">
        {{ description }}
      </p>
    </slot>
  </DefineLoading>

  <Primitive v-bind="delegated" data-slot="spinner" :class="cn(ui.root(), props.ui?.root, props.class)">
    <template v-if="overlay">
      <slot />
      <div data-slot="spinner-viewport" :class="cn(ui.viewport(), props.ui?.viewport)">
        <ReuseLoading />
      </div>
      <Overlay :visible="loading" data-slot="spinner-overlay" :class="cn(ui.overlay(), props.ui?.overlay)" />
    </template>

    <template v-else>
      <ReuseLoading />
    </template>
  </Primitive>
</template>
