<script lang="ts" setup>
import type { TextProps } from './text.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useTextStyle } from './text.style'

const props = withDefaults(defineProps<TextProps>(), {
  as: 'p',
})
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useTextStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
