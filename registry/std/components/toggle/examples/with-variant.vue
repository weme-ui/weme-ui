<script lang="ts" setup>
import Toggle from '../toggle.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'plain', 'inverse'] as const
const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-7) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <template v-for="color in colors" :key="color">
        <Toggle icon="lucide:bold" :color="color" :variant="variant" class="mx-auto" />
      </template>
    </template>
  </div>
</template>
