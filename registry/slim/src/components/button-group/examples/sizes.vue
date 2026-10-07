<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <ButtonGroup size="sm">
      <Button label="Small" />
      <Button label="Small" />
      <Button label="Small" />
    </ButtonGroup>
    <ButtonGroup size="md">
      <Button label="Medium" />
      <Button label="Medium" />
      <Button label="Medium" />
    </ButtonGroup>
    <ButtonGroup size="lg">
      <Button label="Large" />
      <Button label="Large" />
      <Button label="Large" />
    </ButtonGroup>
  </div>
</template>
