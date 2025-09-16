<script lang="ts" setup>
defineProps<{
  logo?: string
}>()
</script>

<template>
  <div class="flex-(~ center) size-8 rounded-full bg-accent-9 c-accent-1">
    <AppIcon v-if="logo" :name="logo" class="size-7" />
  </div>
</template>
