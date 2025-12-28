<script lang="ts" setup>
import Item from '../item.vue'

const variants = ['plain', 'underline', 'outline'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 h-full py-4 gap-6">
    <template v-for="variant in variants" :key="variant">
      <Item icon="user" title="Title" description="Description" content="Content" :variant="variant" />
    </template>
  </div>
</template>
