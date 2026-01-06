<script lang="ts" setup>
import Switch from '../switch.vue'

const value = ref(false)
const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-7) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <template v-for="radius in radiuses" :key="radius">
        <Switch v-model="value" :color="color" :radius="radius" loading class="mx-auto" />
      </template>
    </template>
  </div>
</template>
