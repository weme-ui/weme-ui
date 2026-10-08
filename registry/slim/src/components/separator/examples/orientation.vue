<script lang="ts" setup>
import Separator from '../separator.vue'
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <Separator orientation="horizontal" />
    <div class="flex gap-4 h-16 items-stretch">
      <span class="text-sm self-center">Left</span>
      <Separator orientation="vertical" />
      <span class="text-sm self-center">Right</span>
    </div>
  </div>
</template>
