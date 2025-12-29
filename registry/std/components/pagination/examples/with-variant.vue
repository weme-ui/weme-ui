<script lang="ts" setup>
import Pagination from '../pagination.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'plain'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 mt-6">
    <template v-for="variant in variants" :key="variant">
      <Pagination :total="100" :variant="variant" />
    </template>
  </div>
</template>
