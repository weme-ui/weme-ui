<script lang="ts" setup>
import Switch from '../switch.vue'

const value = ref(false)
const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <template v-for="size in sizes" :key="size">
        <Switch v-model="value" :color="color" :size="size" class="mx-auto" />
      </template>
    </template>
  </div>
</template>
