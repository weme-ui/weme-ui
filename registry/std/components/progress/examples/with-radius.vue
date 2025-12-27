<script lang="ts" setup>
import Progress from '../progress.vue'

const value = ref(80)
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Progress v-model="value" :radius="radius" label="Progress" />
    </template>
  </div>
</template>
