<script lang="ts" setup>
import Button from '../../button/button.vue'
import Tooltip from '../tooltip.vue'

const sides = [
  'top',
  'right',
  'bottom',
  'left',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="side in sides" :key="side">
      <Tooltip text="tooltip" :side="side" :trigger="{ asChild: true }">
        <Button :label="side" variant="plain" />
      </Tooltip>
    </template>
  </div>
</template>
