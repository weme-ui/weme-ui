<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <div class="flex-(~ center) h-full gap-6">
    <ButtonGroup gap="none" radius="lg">
      <Button label="Left" />
      <Button label="Middle" />
      <Button label="Right" />
    </ButtonGroup>
  </div>
</template>
