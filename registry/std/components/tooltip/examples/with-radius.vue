<script lang="ts" setup>
import Button from '../../button/button.vue'
import Tooltip from '../tooltip.vue'

const radiuses = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Tooltip text="tooltip" :radius="radius" :trigger="{ asChild: true }">
        <Button :label="radius" variant="plain" />
      </Tooltip>
    </template>
  </div>
</template>
