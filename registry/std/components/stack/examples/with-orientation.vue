<script lang="ts" setup>
import Stack from '../stack.vue'
</script>

<template>
  <div class="flex gap-6 h-full">
    <Stack orientation="horizontal" class="w-1/2">
      <template v-for="i in 3" :key="i">
        <div class="rounded-lg h-full w-full bg-muted" />
      </template>
    </Stack>

    <Stack orientation="vertical" class="w-1/2">
      <template v-for="i in 3" :key="i">
        <div class="rounded-lg h-12 bg-muted" />
      </template>
    </Stack>
  </div>
</template>
