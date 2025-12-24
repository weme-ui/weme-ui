<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ col center) h-full gap-6">
    <template v-for="color in colors" :key="color">
      <ButtonGroup gap="none" :color="color" radius="lg">
        <Button label="Left" />
        <Button label="Middle" />
        <Button label="Right" />
      </ButtonGroup>
    </template>
  </div>
</template>
