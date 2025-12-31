<script lang="ts" setup>
import Button from '../../button/button.vue'
import Popover from '../popover.vue'

const modes = ['click', 'hover'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="mode in modes" :key="mode">
      <Popover :mode="mode">
        <Button :label="mode" />
        <template #content>
          <div>Content</div>
        </template>
      </Popover>
    </template>
  </div>
</template>
