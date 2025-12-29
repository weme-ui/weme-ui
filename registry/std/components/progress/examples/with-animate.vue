<script lang="ts" setup>
import { ref } from 'vue'
import Progress from '../progress.vue'

const value = ref(80)
const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="(color, index) in colors" :key="color">
      <Progress v-model="value" :color="color" label="Progress" :animate="index % 2 === 0 ? 'stripe' : 'swing'" />
    </template>
  </div>
</template>
