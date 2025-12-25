<script lang="ts" setup>
import Tooltip from '../../tooltip/tooltip.vue'
import IconBox from '../icon-box.vue'

const config = useAppConfig()
const icons = Object.keys(config.weme.icons)
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="icon in icons" :key="icon">
      <Tooltip :text="icon" class="place-self-center">
        <IconBox :name="icon" />
      </Tooltip>
    </template>
  </div>
</template>
