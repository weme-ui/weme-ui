<script lang="ts" setup>
import ScrollArea from '@registry/std/components/scroll-area/scroll-area.vue'
</script>

<template>
  <ScrollArea class="w-80 h-60 bg-neutral-3 rounded-lg">
    <div class="p-4">
      <p v-for="i in 10" :key="i">
        {{ i }}
      </p>
    </div>
  </ScrollArea>
</template>
