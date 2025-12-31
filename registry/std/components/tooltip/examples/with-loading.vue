<script lang="ts" setup>
import Button from '../../button/button.vue'
import Tooltip from '../tooltip.vue'
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <Tooltip text="tooltip" :trigger="{ asChild: true }" loading>
      <Button label="Button" variant="plain" />
    </Tooltip>
  </div>
</template>
