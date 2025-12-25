<script lang="ts" setup>
import Kbd from '../kbd.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="color in colors" :key="color">
      <Kbd value="k" :color="color" class="place-self-center" />
    </template>
  </div>
</template>
