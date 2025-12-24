<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'plain', 'inverse'] as const
</script>

<template>
  <div class="flex-(~ col center) h-full gap-6">
    <template v-for="variant in variants" :key="variant">
      <ButtonGroup gap="none" :variant="variant" radius="lg">
        <Button label="Left" />
        <Button label="Middle" />
        <Button label="Right" />
      </ButtonGroup>
    </template>
  </div>
</template>
