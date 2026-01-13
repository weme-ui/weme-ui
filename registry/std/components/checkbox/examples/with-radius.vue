<script lang="ts" setup>
import Checkbox from '../checkbox.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="radius in radiuses" :key="radius">
      <Checkbox :radius="radius" label="Checkbox" description="This is a description." />
    </template>
  </div>
</template>
