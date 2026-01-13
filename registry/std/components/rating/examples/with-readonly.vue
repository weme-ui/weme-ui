<script lang="ts" setup>
import Rating from '../rating.vue'
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Rating color="warning" :default-value="4" readonly />
  </div>
</template>
