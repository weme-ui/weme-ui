<script lang="ts" setup>
import Pagination from '../pagination.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 mt-6">
    <template v-for="size in sizes" :key="size">
      <Pagination :total="100" :size="size" />
    </template>
  </div>
</template>
