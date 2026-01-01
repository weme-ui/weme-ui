<script lang="ts" setup>
import Timer from '../timer.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Timer mode="countup" :radius="radius" />
    </template>
  </div>
</template>
