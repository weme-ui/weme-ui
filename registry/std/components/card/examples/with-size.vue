<script lang="ts" setup>
import Card from '../card.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-4">
    <template v-for="size in sizes" :key="size">
      <Card title="Title" description="Description" :size="size">
        Content
      </Card>
    </template>
  </div>
</template>
