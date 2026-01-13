<script lang="ts" setup>
import Checkbox from '../checkbox.vue'
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Checkbox
      label="Checkbox"
      description="This is a description."
      checked-icon="mingcute:check-line"
      indeterminate-icon="mingcute:minimize-line"
    />
  </div>
</template>
