<script lang="ts" setup>
defineProps<{
  logo?: ThemeableIcon
  title?: string
}>()
</script>

<template>
  <NuxtLink>
    <!-- Logo icon -->
    <h1 class="text-(xl highlighted) font-semibold">
      weme
    </h1>
  </NuxtLink>
</template>
