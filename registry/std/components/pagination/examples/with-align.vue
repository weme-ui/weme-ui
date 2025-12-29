<script lang="ts" setup>
import Pagination from '../pagination.vue'

const aligns = ['start', 'center', 'end'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 mt-6">
    <template v-for="align in aligns" :key="align">
      <Pagination :total="100" :align="align" />
    </template>
  </div>
</template>
