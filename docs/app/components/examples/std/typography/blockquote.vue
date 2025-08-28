<script lang="ts" setup>
import Typography from '@registry/std/components/typography/typography.vue'

const colors = ['highlighted', 'default', 'toned', 'muted', 'dimmed'] as const
</script>

<template>
  <div class="flex-(~ col) gap-y-4">
    <Typography v-for="color in colors" :key="color" :color="color" as="blockquote">
      Blockquote
    </Typography>
  </div>
</template>
