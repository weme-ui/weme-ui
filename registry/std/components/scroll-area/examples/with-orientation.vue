<script lang="ts" setup>
import ScrollArea from '../scroll-area.vue'
</script>

<template>
  <div class="flex gap-6 h-full gap-6">
    <ScrollArea class="h-40 w-1/2">
      <div class="flex-(~ col) p-4 gap-2">
        <template v-for="i in 100" :key="i">
          <div class="p-2 bg-muted">
            Item {{ i }}
          </div>
        </template>
      </div>
    </ScrollArea>

    <ScrollArea class="h-40 w-1/2" orientation="horizontal">
      <div class="flex p-4 h-40 gap-2">
        <template v-for="i in 100" :key="i">
          <div class="p-2 w-12 h-full bg-muted">
            Item {{ i }}
          </div>
        </template>
      </div>
    </ScrollArea>
  </div>
</template>
