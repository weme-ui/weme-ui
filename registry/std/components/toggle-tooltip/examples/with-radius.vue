<script lang="ts" setup>
import IconButton from '../../icon-button/icon-button.vue'
import ToggleTooltip from '../toggle-tooltip.vue'

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
      <ToggleTooltip :text="radius" :radius="radius">
        <IconButton icon="info" variant="ghost" size="xs" :radius="radius" />
      </ToggleTooltip>
    </template>
  </div>
</template>
