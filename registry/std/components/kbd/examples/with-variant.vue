<script lang="ts" setup>
import Kbd from '../kbd.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'plain', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="variant in variants" :key="variant">
      <Kbd value="k" :variant="variant" class="place-self-center" />
    </template>
  </div>
</template>
