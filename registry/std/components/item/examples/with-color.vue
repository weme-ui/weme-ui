<script lang="ts" setup>
import Item from '../item.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 h-full py-4 gap-6">
    <template v-for="color in colors" :key="color">
      <Item icon="user" title="Title" description="Description" content="Content" :color="color" variant="outline" arrow clickable />
    </template>
  </div>
</template>
