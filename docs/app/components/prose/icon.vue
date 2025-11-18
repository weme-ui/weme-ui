<script lang="ts" setup>
const props = defineProps<{
  name: string
  class?: any
}>()
</script>

<template>
  <UiIcon mode="css" :name="name" :class="props.class" />
</template>
