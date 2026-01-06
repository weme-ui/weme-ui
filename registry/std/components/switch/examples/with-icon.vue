<script lang="ts" setup>
import Switch from '../switch.vue'

const value = ref(false)
const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <Switch v-model="value" :color="color" icon />
    </template>
  </div>
</template>
