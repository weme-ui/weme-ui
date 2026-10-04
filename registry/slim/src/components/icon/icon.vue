<script lang="ts" setup>
import type { IconProps } from './icon.props'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<IconProps>()
const delegated = reactiveOmit(props, 'name', 'class')

const resolvedIcon = computed(() => props.icon ?? props.name)
</script>

<template>
  <Icon v-bind="delegated" :icon="resolvedIcon" :class="props.class" />
</template>
