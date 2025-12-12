<script lang="ts" setup>
import type { SpinnerProps } from './spinner.props'
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
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
const loading = defineModel<boolean>({ default: false })

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
      <p v-if="description" :class="cn(ui.description(), props.ui?.description)">
        {{ description }}
      </p>
    </slot>
  </DefineLoading>

  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <template v-if="overlay">
      <slot />
      <Overlay v-model="loading" :class="cn(ui.overlay(), props.ui?.overlay)" disabled>
        <ReuseLoading />
      </Overlay>
    </template>

    <template v-else>
      <ReuseLoading />
    </template>
  </Primitive>
</template>
