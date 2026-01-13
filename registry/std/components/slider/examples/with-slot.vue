<script lang="ts" setup>
import Icon from '../../icon/icon.vue'
import Slider from '../slider.vue'
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <Slider :ui="{ thumb: 'flex-(~ center) size-4.5' }">
      <template #thumb>
        <Icon name="lucide:move-horizontal" class="size-3" />
      </template>
    </Slider>
  </div>
</template>
