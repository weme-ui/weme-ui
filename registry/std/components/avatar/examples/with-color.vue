<script lang="ts" setup>
import Avatar from '../avatar.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="color in colors" :key="color">
      <Avatar fallback="A" :color="color" />
    </template>
  </div>
</template>
