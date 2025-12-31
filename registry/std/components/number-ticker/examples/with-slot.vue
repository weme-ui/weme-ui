<script lang="ts" setup>
import NumberTicker from '../number-ticker.vue'
</script>

<template>
  <div class="flex-(~ center) my-4">
    <NumberTicker v-slot="{ output }" :value="100">
      [{{ output }}]
    </NumberTicker>
  </div>
</template>
