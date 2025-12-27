<script lang="ts" setup>
import Banner from '../banner.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div v-for="color in colors" :key="color" class="my-4">
    <Banner title="😄 Banner" :color="color" />
  </div>
</template>
