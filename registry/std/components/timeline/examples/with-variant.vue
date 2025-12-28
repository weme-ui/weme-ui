<script lang="ts" setup>
import Timeline from '../timeline.vue'

const variants = ['solid', 'soft', 'surface', 'outline'] as const
</script>

<template>
  <div class="flex gap-6">
    <template v-for="variant in variants" :key="variant">
      <Timeline
        :variant="variant"
        :items="[
          { icon: 'lucide:check', title: 'Title 1', description: 'Description 1' },
          { icon: 'lucide:check', title: 'Title 2', description: 'Description 2' },
          { icon: 'user', title: 'Title 3', description: 'Description 3' },
        ]"
        class="flex-1"
      />
    </template>
  </div>

  <div class="flex gap-6 mt-6">
    <template v-for="variant in variants" :key="variant">
      <Timeline
        :variant="variant"
        :items="[
          { title: 'Title 1', description: 'Description 1', color: 'danger' },
          { title: 'Title 2', description: 'Description 2', color: 'secondary' },
          { title: 'Title 3', description: 'Description 3' },
        ]"
        class="flex-1"
      />
    </template>
  </div>
</template>
