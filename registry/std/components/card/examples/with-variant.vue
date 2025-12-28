<script lang="ts" setup>
import Card from '../card.vue'

const variants = ['normal', 'outline'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-4">
    <template v-for="variant in variants" :key="variant">
      <Card title="Title" description="Description" :variant="variant">
        Content
      </Card>
    </template>
  </div>
</template>
