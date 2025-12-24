<script lang="ts" setup>
import Button from '../button.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 flex-wrap">
    <template v-for="radius in radiuses" :key="radius">
      <Button :label="radius" :radius="radius" class="place-self-center" />
    </template>
  </div>
</template>
