<script lang="ts" setup>
import Stack from '../stack.vue'
</script>

<template>
  <Stack>
    <template v-for="i in 3" :key="i">
      <div class="rounded-lg h-12 bg-muted" />
    </template>
  </Stack>
</template>
