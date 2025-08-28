<script lang="ts" setup>
import Typography from '@registry/std/components/typography/typography.vue'

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
</script>

<template>
  <div class="flex-(~ col) gap-y-4">
    <Typography v-for="tag in tags" :key="tag" :as="tag">
      Heading
    </Typography>
  </div>
</template>
