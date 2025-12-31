<script lang="ts" setup>
import ButtonGroup from '../../button-group/button-group.vue'
import Button from '../../button/button.vue'
import ActionSheet from '../action-sheet.vue'

const open = ref(false)
</script>

<template>
  <Button label="Open" @click="open = !open" />

  <ActionSheet v-model="open" radius="full">
    <template #selection>
      0 Selected Items
    </template>

    <template #actions>
      <ButtonGroup radius="full" gap="none">
        <Button label="Action 1" />
        <Button label="Action 2" />
        <Button label="Action 3" />
      </ButtonGroup>
    </template>
  </ActionSheet>
</template>
