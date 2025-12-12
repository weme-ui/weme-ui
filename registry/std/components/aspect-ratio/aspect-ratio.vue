<script lang="ts" setup>
import type { AspectRatioProps } from './aspect-ratio.props'
import { reactiveOmit } from '@vueuse/core'
import { AspectRatio } from 'reka-ui'

const props = defineProps<AspectRatioProps>()
const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <AspectRatio v-bind="delegated" :class="props.class">
    <slot />
  </AspectRatio>
</template>
