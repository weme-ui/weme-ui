<script lang="ts" setup>
import Tooltip from '../../tooltip/tooltip.vue'
import IconBox from '../icon-box.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-15) h-full py-4 gap-6">
    <template v-for="size in sizes" :key="size">
      <Tooltip :text="size" class="place-self-center">
        <IconBox name="user" :size="size" />
      </Tooltip>
    </template>
  </div>
</template>
