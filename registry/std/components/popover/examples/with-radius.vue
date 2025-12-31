<script lang="ts" setup>
import Button from '../../button/button.vue'
import Popover from '../popover.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Popover :radius="radius">
        <Button :label="radius" />
        <template #content>
          <div>Content</div>
        </template>
      </Popover>
    </template>
  </div>
</template>
