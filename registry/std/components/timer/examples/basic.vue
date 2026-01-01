<script lang="ts" setup>
import Timer from '../timer.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <Timer mode="countdown" :start-time="60 * 1000" />
  </div>
</template>
