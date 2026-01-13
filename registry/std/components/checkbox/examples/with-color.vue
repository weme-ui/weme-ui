<script lang="ts" setup>
import Checkbox from '../checkbox.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <Checkbox :color="color" label="Checkbox" description="This is a description." />
    </template>
  </div>
</template>
