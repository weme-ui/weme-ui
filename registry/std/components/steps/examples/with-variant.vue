<script lang="ts" setup>
import { ref } from 'vue'
import Steps from '../steps.vue'

const value = ref(1)
const variants = ['solid', 'soft'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Steps
        v-model="value"
        :items="[
          { title: 'Title 1', description: 'Description 1' },
          { title: 'Title 2', description: 'Description 2' },
          { title: 'Title 3', description: 'Description 3' },
        ]"
        :variant="variant"
      />
    </template>
  </div>
</template>
