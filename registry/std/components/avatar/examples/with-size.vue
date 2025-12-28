<script lang="ts" setup>
import Avatar from '../avatar.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Avatar src="https://github.com/yyx990803.png" :size="size" />
    </template>
  </div>
</template>
