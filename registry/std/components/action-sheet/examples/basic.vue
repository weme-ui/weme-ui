<script lang="ts" setup>
import Button from '../../button/button.vue'
import ActionSheet from '../action-sheet.vue'

const open = ref(false)
</script>

<template>
  <Button label="Open" @click="open = !open" />

  <ActionSheet v-model="open">
    <template #selection>
      0 Selected Items
    </template>

    <template #actions>
      <Button label="Action 1" />
      <Button label="Action 2" />
      <Button label="Action 3" />
    </template>
  </ActionSheet>
</template>
