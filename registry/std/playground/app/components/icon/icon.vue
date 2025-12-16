<script lang="ts" setup>
import type { IconProps } from './icon.props'
import { useAppConfig } from '#imports'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

const props = withDefaults(defineProps<IconProps>(), {
  mode: 'css',
})

const delegated = reactiveOmit(props, 'name', 'class')
const wemeIcons = useAppConfig().weme.icons
const iconName = computed(() => {
  if (Object.keys(wemeIcons).includes(props.name))
    return wemeIcons[props.name as any as keyof typeof wemeIcons] as string

  return props.name
})
</script>

<template>
  <UseIcon v-bind="{ ...delegated, ...$attrs }" :name="iconName" :class="props.class" />
</template>
