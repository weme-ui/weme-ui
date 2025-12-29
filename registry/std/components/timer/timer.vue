<script lang="ts" setup>
import type { TimerEmits, TimerProps } from './timer.props'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useTimerStyle } from './timer.style'

const props = defineProps<TimerProps>()
const emits = defineEmits<TimerEmits>()
const delegated = reactivePick(props, 'as', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useTimerStyle(props))
</script>

<template>
  <Primitive v-bind="forwarded" data-slot="root" :class="cn(ui.root(), props.ui?.root, props.class)">
    <slot />
  </Primitive>
</template>
