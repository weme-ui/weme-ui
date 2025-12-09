<script lang="ts" setup>
import type { IconProps } from './icon.props'
import { useAppConfig } from '#imports'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

const props = withDefaults(defineProps<IconProps>(), {
  mode: 'svg',
})

const delegated = reactiveOmit(props, 'name')

const resolvedIcon = computed(() => {
  const icons = useAppConfig().weme.icons

  if (Object.keys(icons).includes(props.name))
    return icons[props.name as any as keyof typeof icons] as string

  return props.name
})
</script>

<template>
  <UseIcon v-bind="delegated" :name="resolvedIcon" />
</template>
