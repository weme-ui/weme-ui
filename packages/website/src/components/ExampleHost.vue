<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  examplePath: string
}>()

const exampleModules = import.meta.glob<{ default: any }>(
  '../../../../registry/*/src/**/examples/*.vue',
  { eager: true },
)

const Example = computed(() => {
  const key = Object.keys(exampleModules).find(path =>
    path.endsWith(`/registry/${props.examplePath}`)
    || path.endsWith(props.examplePath)
    || path.includes(props.examplePath),
  )
  return key ? exampleModules[key]?.default : null
})
</script>

<template>
  <component :is="Example" v-if="Example" />
  <p v-else class="text-sm text-neutral-11">
    Example not found: {{ examplePath }}
  </p>
</template>
