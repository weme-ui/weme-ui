<script lang="ts" setup>
import type { MarqueeProps } from './marquee.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useMarqueeStyle } from './marquee.style'

const props = withDefaults(defineProps<MarqueeProps>(), {
  orientation: 'horizontal',
  repeat: 4,
  spacing: '1rem',
  speed: 50,
  loop: 'infinite',
  pauseOnHover: true,
  reverse: false,
  edgeFade: true,
})

const delegated = reactivePick(props, 'as', 'asChild')

const ui = computed(() => useMarqueeStyle({
  orientation: props.orientation,
  pauseOnHover: toBoolValue(props.pauseOnHover),
  reverse: toBoolValue(props.reverse),
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :data-orientation="orientation"
    :class="cn(ui.base(), props.ui?.base, props.class)"
    :style="{
      '--marquee-loop': loop,
      '--marquee-duration': `${speed * repeat / 10}s`,
      '--marquee-spacing': spacing,
    }"
    data-slot="marquee"
  >
    <div v-if="edgeFade" :class="cn(ui.edge({ side: 'start' }), props.ui?.edge)" data-slot="marquee-edge-start" />
    <div :class="cn(ui.viewport(), props.ui?.viewport)" data-slot="marquee-viewport">
      <div v-for="n in repeat" :key="n" :class="cn(ui.content(), props.ui?.content)" data-slot="marquee-content">
        <slot />
      </div>
    </div>
    <div v-if="edgeFade" :class="cn(ui.edge({ side: 'end' }), props.ui?.edge)" data-slot="marquee-edge-end" />
  </Primitive>
</template>
