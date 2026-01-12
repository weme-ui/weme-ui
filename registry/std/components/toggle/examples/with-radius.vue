<script lang="ts" setup>
import Toggle from '../toggle.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-7) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <template v-for="radius in radiuses" :key="radius">
        <Toggle icon="lucide:bold" :color="color" :radius="radius" class="mx-auto" />
      </template>
    </template>
  </div>
</template>
