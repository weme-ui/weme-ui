<script lang="ts" setup>
import Item from '../item.vue'

const aligns = ['start', 'center', 'end'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 h-full py-4 gap-6">
    <template v-for="align in aligns" :key="align">
      <Item icon="user" title="Title" description="Description" content="Content" :align="align" variant="outline" arrow clickable />
    </template>
  </div>
</template>
