<script lang="ts" setup>
import AnimatedSelectIcon from '../animated-select-icon.vue'
</script>

<template>
  <div class="text-lg flex flex-wrap gap-6 items-center">
    <span class="inline-flex gap-2 items-center">
      <AnimatedSelectIcon icon="ri:checkbox-blank-circle-line" selected-icon="ri:checkbox-circle-fill" :selected="false" />
      Unselected
    </span>
    <span class="inline-flex gap-2 items-center">
      <AnimatedSelectIcon icon="ri:checkbox-blank-circle-line" selected-icon="ri:checkbox-circle-fill" :selected="true" />
      Selected
    </span>
  </div>
</template>
