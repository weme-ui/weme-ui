<script lang="ts" setup>
import Textarea from '../textarea.vue'
</script>

<template>
  <div class="text-center mt-4">
    <Textarea
      name="textarea"
      placeholder="Enter your text here"
      class="min-w-80"
      :max-length="100"
      counter
    />
  </div>
</template>
