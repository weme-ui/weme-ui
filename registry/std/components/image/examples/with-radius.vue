<script lang="ts" setup>
import Image from '../image.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Image src="https://github.com/antfu.png" width="100" :radius="radius" />
    </template>
  </div>
</template>
