<script lang="ts" setup>
import NumberTicker from '../number-ticker.vue'
</script>

<template>
  <div class="flex-(~ center) my-4">
    <NumberTicker :value="100.9" :decimal="2" :transform="(v) => `${v}%`" />
  </div>
</template>
