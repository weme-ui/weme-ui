<script lang="ts" setup>
import Tooltip from '../../tooltip/tooltip.vue'
import IconBox from '../icon-box.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-15) h-full py-4 gap-6">
    <template v-for="color in colors" :key="color">
      <Tooltip :text="color" class="place-self-center">
        <IconBox name="user" :color="color" />
      </Tooltip>
    </template>
  </div>
</template>
