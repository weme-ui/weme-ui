<script lang="ts" setup>
import Avatar from '../avatar.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Avatar src="https://github.com/yyx990803.png" :radius="radius" />
    </template>
  </div>
</template>
