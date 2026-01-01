<script lang="ts" setup>
import Timer from '../timer.vue'

const precisions = [0, 1, 2, 3] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="precision in precisions" :key="precision">
      <Timer mode="countup" :precision="precision" />
    </template>
  </div>
</template>
