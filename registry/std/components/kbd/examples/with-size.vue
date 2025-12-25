<script lang="ts" setup>
import Kbd from '../kbd.vue'

const sizes = ['xs', 'sm', 'md'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="size in sizes" :key="size">
      <Kbd value="k" :size="size" class="place-self-center" />
    </template>
  </div>
</template>
