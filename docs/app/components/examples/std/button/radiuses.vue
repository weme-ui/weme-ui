<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'

const radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <Button v-for="radius in radiuses" :key="radius" :radius="radius" icon="user">
      Button
    </Button>
  </div>
</template>
