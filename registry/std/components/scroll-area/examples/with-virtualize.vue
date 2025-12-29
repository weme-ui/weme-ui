<script lang="ts" setup>
import { ref } from 'vue'
import ScrollArea from '../scroll-area.vue'

const items = ref(Array.from({ length: 100 }, (_, i) => ({ id: i })))
</script>

<template>
  <ScrollArea class="h-40" :items="items" virtualize>
    <template #default="{ item }">
      <div class="p-2 bg-muted my-2">
        {{ item }}
      </div>
    </template>
  </ScrollArea>
</template>
