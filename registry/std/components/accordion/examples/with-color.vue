<script lang="ts" setup>
import Accordion from '../accordion.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="color in colors" :key="color">
      <Accordion
        variant="table"
        :items="[
          { title: 'Title 1', icon: 'lucide:circle-dashed', description: 'Description 1', content: 'Content 1' },
          { title: 'Title 2', icon: 'lucide:square-dashed', description: 'Description 2', content: 'Content 2' },
          { title: 'Title 3', icon: 'lucide:triangle-dashed', description: 'Description 3', content: 'Content 3' },
        ]"
        :color="color"
      />
    </template>
  </div>
</template>
