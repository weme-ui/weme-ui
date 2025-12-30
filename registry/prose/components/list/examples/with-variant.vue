<script lang="ts" setup>
import List from '../list.vue'

const variants = ['none', 'marker'] as const
</script>

<template>
  <div class="flex gap-6">
    <template v-for="variant in variants" :key="variant">
      <List
        :variant="variant"
        :items="[
          { text: 'Item 1' },
          { text: 'Item 2' },
          { text: 'Item 3' },
        ]"
      />
    </template>
  </div>
</template>
