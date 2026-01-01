<script lang="ts" setup>
import Timer from '../timer.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="color in colors" :key="color">
      <div class="flex-(~ center) p-6 bg-neutral">
        <Timer mode="countup" variant="inverse" :color="color" />
      </div>
    </template>
  </div>
</template>
