<script lang="ts" setup>
import Checkbox from '../checkbox.vue'

const checked = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <Checkbox
      label="Checkbox"
      description="This is a description."
      disabled
    />

    <Checkbox
      v-model="checked"
      label="Checkbox"
      description="This is a description."
    />
  </div>
</template>
