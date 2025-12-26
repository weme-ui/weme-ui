<script lang="ts" setup>
import ScrollArea from '../scroll-area.vue'
</script>

<template>
  <ScrollArea class="h-40">
    <div class="flex-(~ col) gap-2">
      <template v-for="i in 100" :key="i">
        <div class="p-2 bg-muted">
          Item {{ i }}
        </div>
      </template>
    </div>
  </ScrollArea>
</template>
