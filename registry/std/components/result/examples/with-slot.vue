<script lang="ts" setup>
import Button from '../../button/button.vue'
import Result from '../result.vue'
</script>

<template>
  <Result>
    <template #indicator>
      <div class="bg-primary size-16 rounded-full" />
    </template>
    <template #title>
      <h3 class="text-(3xl highlighted) font-(semibold serif)">
        404
      </h3>
    </template>
    <template #description>
      <p class="text-sm mt-2">
        Page not found!
      </p>
    </template>

    <div class="mt-4">
      <Button label="Back to home" />
    </div>
  </Result>
</template>
