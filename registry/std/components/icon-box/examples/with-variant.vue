<script lang="ts" setup>
import Tooltip from '../../tooltip/tooltip.vue'
import IconBox from '../icon-box.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'plain', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-15) h-full py-4 gap-6">
    <template v-for="variant in variants" :key="variant">
      <Tooltip :text="variant" class="place-self-center">
        <IconBox name="user" :variant="variant" />
      </Tooltip>
    </template>
  </div>
</template>
