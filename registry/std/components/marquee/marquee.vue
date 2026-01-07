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
    data-slot="marquee"
    :data-orientation="orientation"
    :class="cn(ui.base(), props.ui?.base, props.class)"
    :style="{
      '--marquee-loop': loop,
      '--marquee-duration': `${speed * repeat / 10}s`,
      '--marquee-spacing': spacing,
    }"
  >
    <div
      v-if="edgeFade && orientation === 'horizontal'"
      data-slot="marquee-edge-start"
      :class="cn(ui.edge({ side: 'start' }), props.ui?.edge)"
    />
    <div data-slot="marquee-viewport" :class="cn(ui.viewport(), props.ui?.viewport)">
      <div v-for="n in repeat" :key="n" data-slot="marquee-content" :class="cn(ui.content(), props.ui?.content)">
        <slot />
      </div>
    </div>
    <div
      v-if="edgeFade && orientation === 'horizontal'"
      data-slot="marquee-edge-end"
      :class="cn(ui.edge({ side: 'end' }), props.ui?.edge)"
    />
  </Primitive>
</template>
