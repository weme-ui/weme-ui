<script lang="ts" setup>
import IconButton from '../../icon-button/icon-button.vue'
import ToggleTooltip from '../toggle-tooltip.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <ToggleTooltip text="Info">
      <IconButton icon="info" variant="ghost" size="xs" radius="full" />
    </ToggleTooltip>
  </div>
</template>
