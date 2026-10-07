<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <ButtonGroup radius="none">
      <Button label="None" />
      <Button label="None" />
      <Button label="None" />
    </ButtonGroup>
    <ButtonGroup radius="sm">
      <Button label="Small" />
      <Button label="Small" />
      <Button label="Small" />
    </ButtonGroup>
    <ButtonGroup radius="full">
      <Button label="Full" />
      <Button label="Full" />
      <Button label="Full" />
    </ButtonGroup>
  </div>
</template>
