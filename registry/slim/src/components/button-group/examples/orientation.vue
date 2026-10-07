<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-start">
    <ButtonGroup orientation="horizontal">
      <Button label="Left" />
      <Button label="Center" />
      <Button label="Right" />
    </ButtonGroup>
    <ButtonGroup orientation="vertical">
      <Button label="Top" />
      <Button label="Middle" />
      <Button label="Bottom" />
    </ButtonGroup>
  </div>
</template>
