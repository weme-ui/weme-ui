<script lang="ts" setup>
import { ref } from 'vue'
import Progress from '../progress.vue'

const value = ref(80)
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="size in sizes" :key="size">
      <Progress v-model="value" :size="size" label="Progress" />
    </template>
  </div>
</template>
