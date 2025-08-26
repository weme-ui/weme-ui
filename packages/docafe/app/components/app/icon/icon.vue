<script lang="ts" setup>
const { name } = defineProps<{
  name: string
}>()

const resolvedName = computed(() => {
  const icons = useAppConfig().docafe.icons

  if (Object.keys(icons).includes(name))
    return icons[name as keyof DocafeConfigIcons] as string

  return name
})
</script>

<template>
  <UiIcon :name="resolvedName" />
</template>
