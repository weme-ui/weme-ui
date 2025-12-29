<script lang="ts" setup>
import Pagination from '../pagination.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 mt-6">
    <template v-for="radius in radiuses" :key="radius">
      <Pagination :total="100" :radius="radius" />
    </template>
  </div>
</template>
