<script lang="ts" setup>
import type { SpinnerProps } from './spinner.props'
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useSpinnerStyle } from './spinner.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SpinnerProps>(), {
  icon: 'loading',
})

defineSlots<{
  default: any
  description: any
}>()

const slots = useSlots()
const mask = computed(() => !!slots.default?.())
const delegated = reactivePick(props, 'as', 'asChild')

const ui = computed(() => useSpinnerStyle({
  ...props,
  animate: !!props.animate || props.icon === 'loading',
  mask: mask.value,
}))

const [
  DefineLoading,
  ReuseLoading,
] = createReusableTemplate()
</script>

<template>
  <DefineLoading>
    <Icon :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    <slot name="description">
      <p v-if="description" :class="cn(ui.description(), props.ui?.description)">
        {{ description }}
      </p>
    </slot>
  </DefineLoading>

  <Primitive v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <template v-if="mask">
      <slot />
      <div v-if="loading" :class="cn(ui.overlay(), props.ui?.overlay)">
        <ReuseLoading />
      </div>
    </template>

    <ReuseLoading v-else-if="loading" />
  </Primitive>
</template>
