<script lang="ts" setup>
import Banner from '../banner.vue'

const variants = ['solid', 'soft', 'inverse'] as const
</script>

<template>
  <div v-for="variant in variants" :key="variant" class="my-4">
    <Banner title="😄 Banner" :variant="variant" />
  </div>
</template>
