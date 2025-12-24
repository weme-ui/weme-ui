<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'

const gaps = ['none', 'xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ col center) h-full gap-6">
    <template v-for="gap in gaps" :key="gap">
      <ButtonGroup :gap="gap" radius="lg">
        <Button label="Left" />
        <Button label="Middle" />
        <Button label="Right" />
      </ButtonGroup>
    </template>
  </div>
</template>
