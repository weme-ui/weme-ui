<script lang="ts" setup>
import Avatar from '../avatar.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Avatar fallback="A" :variant="variant" />
    </template>
  </div>
</template>
