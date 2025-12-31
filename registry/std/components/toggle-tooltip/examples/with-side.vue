<script lang="ts" setup>
import IconButton from '../../icon-button/icon-button.vue'
import ToggleTooltip from '../toggle-tooltip.vue'

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
      <ToggleTooltip :text="side" :side="side">
        <IconButton icon="info" variant="ghost" size="xs" radius="full" />
      </ToggleTooltip>
    </template>
  </div>
</template>
