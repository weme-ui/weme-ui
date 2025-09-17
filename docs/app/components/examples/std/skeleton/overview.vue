<script lang="ts" setup>
import Skeleton from '@registry/std/components/skeleton/skeleton.vue'
</script>

<template>
  <div class="flex gap-3">
    <Skeleton class="size-12" />
    <div class="flex-(~ 1 col) gap-3">
      <Skeleton class="h-4" />
      <Skeleton class="h-4 w-1/2" />
    </div>
  </div>
</template>
