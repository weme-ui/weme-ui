<script lang="ts" setup>
import ScrollArea from '../scroll-area.vue'

const radiuses = ['none', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <ScrollArea v-for="radius in radiuses" :key="radius" size="lg" :radius="radius" class="h-40 w-full">
      <div class="flex-(~ col) p-4 gap-2">
        <template v-for="i in 100" :key="i">
          <div class="p-2 bg-muted">
            Item {{ i }}
          </div>
        </template>
      </div>
    </ScrollArea>
  </div>
</template>
