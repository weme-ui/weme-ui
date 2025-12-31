<script lang="ts" setup>
import Marquee from '../marquee.vue'
</script>

<template>
  <div class="mx-auto h-60 w-60 overflow-hidden">
    <Marquee orientation="vertical">
      <div class="w-60 h-60 bg-primary" />
      <div class="w-60 h-60 bg-secondary" />
      <div class="w-60 h-60 bg-neutral" />
    </Marquee>
  </div>
</template>
