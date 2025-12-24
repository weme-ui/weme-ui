<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ col center) h-full gap-6">
    <template v-for="size in sizes" :key="size">
      <ButtonGroup gap="none" :size="size" radius="lg">
        <Button label="Left" />
        <Button label="Middle" />
        <Button label="Right" />
      </ButtonGroup>
    </template>
  </div>
</template>
