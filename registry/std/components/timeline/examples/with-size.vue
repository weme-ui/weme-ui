<script lang="ts" setup>
import Timeline from '../timeline.vue'

const sizes = ['sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex gap-6">
    <template v-for="size in sizes" :key="size">
      <Timeline
        :size="size"
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
    <template v-for="size in sizes" :key="size">
      <Timeline
        :size="size"
        :items="[
          { title: 'Title 1', description: 'Description 1' },
          { title: 'Title 2', description: 'Description 2' },
          { title: 'Title 3', description: 'Description 3' },
        ]"
        class="flex-1"
      />
    </template>
  </div>

  <div class="flex gap-6 mt-6">
    <template v-for="size in sizes" :key="size">
      <Timeline
        :size="size"
        :items="[
          { title: 'Title 1', description: 'Description 1' },
          { title: 'Title 2', description: 'Description 2' },
          { title: 'Title 3', description: 'Description 3' },
        ]"
        variant="outline"
        class="flex-1"
      />
    </template>
  </div>
</template>
