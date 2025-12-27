<script lang="ts" setup>
import Alert from '../alert.vue'

const statuses = [undefined, 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ col) gap-4">
    <template v-for="status in statuses" :key="status">
      <Alert :status="status" icon="info" title="Title" :content="`status: ${status}`" />
    </template>
  </div>
</template>
