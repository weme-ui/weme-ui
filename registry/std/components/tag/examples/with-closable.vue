<script lang="ts" setup>
import Tag from '../tag.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="color in colors" :key="color">
      <Tag :color="color" :label="color" closable />
    </template>
  </div>
</template>
