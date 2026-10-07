<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <ButtonGroup disabled>
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup>
      <Button label="Enabled" />
      <Button label="Disabled" disabled />
      <Button label="Enabled" />
    </ButtonGroup>
  </div>
</template>
