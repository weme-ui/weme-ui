<script lang="ts" setup>
import Timeline from '../timeline.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex gap-6">
    <template v-for="color in colors" :key="color">
      <Timeline
        :color="color"
        :items="[
          { icon: 'lucide:check', title: 'Title 1', description: 'Description 1' },
          { icon: 'lucide:check', title: 'Title 2', description: 'Description 2' },
          { icon: 'user', title: 'Title 3', description: 'Description 3' },
        ]"
        class="flex-1"
      />
    </template>
  </div>
</template>
