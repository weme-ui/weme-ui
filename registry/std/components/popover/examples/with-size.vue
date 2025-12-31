<script lang="ts" setup>
import Button from '../../button/button.vue'
import Popover from '../popover.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Popover :size="size">
        <Button :label="size" />
        <template #content>
          <div>Content</div>
        </template>
      </Popover>
    </template>
  </div>
</template>
