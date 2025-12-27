<script lang="ts" setup>
import Skeleton from '../skeleton.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-8 mb-2">
    <template v-for="radius in radiuses" :key="radius">
      <div class="mx-auto flex-(~ center) gap-3 w-40 h-8">
        <Skeleton :radius="radius" variant="rect" class="w-10 h-10" />
        <Skeleton variant="text" :radius="radius" :lines="2" class="flex-1" />
      </div>
    </template>
  </div>
</template>
