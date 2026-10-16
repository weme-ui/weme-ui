<script lang="ts" setup>
import Button from '../../button/button.vue'
import Empty from '../empty.vue'
</script>

<template>
  <Empty icon="ri:file-add-line">
    <template #title>
      No files yet
    </template>
    <template #description>
      Upload a file or create a new one to get started.
    </template>
    <template #content>
      <Button label="Create file" size="sm" />
    </template>
  </Empty>
</template>
