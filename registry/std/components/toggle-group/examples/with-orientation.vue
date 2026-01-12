<script lang="ts" setup>
import ToggleGroup from '../toggle-group.vue'

const items = [
  { value: 'bold', icon: 'lucide:bold' },
  { value: 'italic', icon: 'lucide:italic' },
  { value: 'underline', icon: 'lucide:underline' },
]
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <ToggleGroup :items="items" type="multiple" />
    <ToggleGroup :items="items" type="multiple" orientation="vertical" />
  </div>
</template>
