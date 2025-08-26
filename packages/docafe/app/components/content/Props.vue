<script lang="ts" setup>
const { name } = defineProps<{
  name: string
}>()
</script>

<template>
  <div>
    {{ name }}
  </div>
</template>
