<script lang="ts" setup>
import Breadcrumb from '../breadcrumb.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6">
    <template v-for="size in sizes" :key="size">
      <Breadcrumb
        :size="size"
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Examples', to: '/examples' },
          { label: 'Disclosure', to: '/examples/disclosure' },
        ]"
      />
    </template>
  </div>
</template>
