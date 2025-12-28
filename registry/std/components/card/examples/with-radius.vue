<script lang="ts" setup>
import Card from '../card.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-4">
    <template v-for="radius in radiuses" :key="radius">
      <Card title="Title" description="Description" :radius="radius">
        Content
      </Card>
    </template>
  </div>
</template>
