<script lang="ts" setup>
import IconButton from '../icon-button.vue'

const config = useAppConfig()
const icons = Object.keys(config.weme.icons)
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="icon in icons" :key="icon">
      <IconButton :icon="icon" />
    </template>
  </div>
</template>
