<script lang="ts" setup>
import Input from '../input.vue'
</script>

<template>
  <div class="text-center">
    <Input
      name="input"
      placeholder="Enter your text here"
      autocomplete="off"
      counter
      :max-length="10"
      class="min-w-80"
    />
  </div>
</template>
