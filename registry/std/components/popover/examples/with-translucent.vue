<script lang="ts" setup>
import Button from '../../button/button.vue'
import Popover from '../popover.vue'

const variants = ['normal', 'outline'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Popover :variant="variant" translucent>
        <Button :label="variant" />
        <template #content>
          <div>Content</div>
        </template>
      </Popover>
    </template>
  </div>
</template>
