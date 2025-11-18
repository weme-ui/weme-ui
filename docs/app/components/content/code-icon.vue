<script lang="ts" setup>
import { useCodeIcon } from '~/styles/prose'

const props = defineProps<{
  icon?: string
  filename?: string
}>()

const codeIcons = useCodeIcon()

const icon = computed(() => {
  if (props.icon)
    return props.icon

  if (!props.filename)
    return

  const cleanFilename = props.filename.replace(/\s*\(.*\)\s*$/, '')
  const ext = cleanFilename.includes('.') && cleanFilename.split('.').pop()
  const name = cleanFilename.split('/').pop()

  return (name && codeIcons[name.toLowerCase()]) ?? (ext && (codeIcons[ext] ?? `vscode-icons:file-type-${ext}`))
})
</script>

<template>
  <ProseIcon v-if="icon" :name="icon" />
</template>
