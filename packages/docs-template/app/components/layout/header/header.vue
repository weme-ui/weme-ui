<script lang="ts" setup>
const config = useConfig()
</script>

<template>
  <header class="sticky top-0 z-10">
    <div class="flex justify-end px-6 py-4">
      <LayoutLogo class="w-1/4" />
      <LayoutHeaderNav :nav="config.nav" class="flex-1" />
      <LayoutHeaderLinks :links="config.links" class="w-1/4" />
    </div>
  </header>
</template>
