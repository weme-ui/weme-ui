<script lang="ts" setup>
import Timer from '../timer.vue'
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <Timer :start-time="15000" :precision="0" />
    <Timer mode="countup" :precision="0" />
  </div>
</template>
