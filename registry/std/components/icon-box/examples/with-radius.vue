<script lang="ts" setup>
import Tooltip from '../../tooltip/tooltip.vue'
import IconBox from '../icon-box.vue'

const radiuses = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-15) h-full py-4 gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Tooltip :text="radius" class="place-self-center">
        <IconBox name="user" :radius="radius" />
      </Tooltip>
    </template>
  </div>
</template>
