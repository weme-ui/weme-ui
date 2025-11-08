<script lang="ts" setup>
import type { TypographyProps } from './typography.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useTypographyStyle } from './typography.style'

const props = withDefaults(defineProps<TypographyProps>(), {
  as: 'p',
  color: 'default',
})
const delegated = reactiveOmit(props, 'class', 'color', 'value')

const ui = computed(() => useTypographyStyle(props))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :class="cn(ui, props.class)"
  >
    <slot>
      {{ value }}
    </slot>
  </Primitive>
</template>
