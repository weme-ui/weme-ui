<script lang="ts" setup>
import Steps from '../steps.vue'

const value = ref(1)
const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6">
    <template v-for="size in sizes" :key="size">
      <Steps
        v-model="value"
        :items="[
          { title: 'Title 1', description: 'Description 1' },
          { title: 'Title 2', description: 'Description 2' },
          { title: 'Title 3', description: 'Description 3' },
        ]"
        :size="size"
      />
    </template>
  </div>
</template>
