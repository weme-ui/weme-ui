<script lang="ts" setup>
import type { IconProps } from './icon.props'
import { useAppConfig } from '#imports'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<IconProps>()
const delegated = reactiveOmit(props, 'name', 'class')
const icons = useAppConfig().weme.icons

const iconName = computed(() => {
  if (Object.keys(icons).includes(props.name))
    return icons[props.name as any as keyof typeof icons] as string

  return props.name
})
</script>

<template>
  <UseIcon v-bind="{ ...delegated, ...$attrs }" :name="iconName" :class="props.class" />
</template>
