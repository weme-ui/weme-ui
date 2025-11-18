<script lang="ts" setup>
const navs = useHeader()
</script>

<template>
  <header class="sticky top-0 z-10 w-full bg-neutral-1/85 backdrop-blur-xs b-(b default)">
    <div class="flex-(~ y-center) gap-x-6 justify-end container mx-auto px-6 py-4">
      <AppHeaderLogo />
      <AppHeaderNavigation :items="navs" class="flex-1" />
      <AppHeaderLinks />
    </div>
  </header>
</template>
