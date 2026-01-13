<script lang="ts" setup>
import Checkbox from '../checkbox.vue'

const indicators = ['start', 'end', 'none'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="indicator in indicators" :key="indicator">
      <Checkbox :indicator="indicator" label="Checkbox" description="This is a description." />
    </template>
  </div>
</template>
