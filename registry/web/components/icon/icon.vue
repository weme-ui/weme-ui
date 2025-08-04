<script lang="ts" setup>
import type { IconProps } from './icon.props'
import { useAppConfig } from '#app'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<IconProps>()
const delegated = reactiveOmit(props, 'name')

const resolvedIcon = computed(() => {
  const defaults = useAppConfig().weme.icons

  if (Object.keys(defaults).includes(props.name))
    return defaults[props.name as WemeIconName] as string

  return props.name
})
</script>

<template>
  <UseIcon v-bind="delegated" :name="resolvedIcon" />
</template>
