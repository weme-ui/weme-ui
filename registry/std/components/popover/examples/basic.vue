<script lang="ts" setup>
import Button from '../../button/button.vue'
import Popover from '../popover.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <Popover>
      <Button label="Open" />
      <template #content>
        <div>Content</div>
      </template>
    </Popover>
  </div>
</template>
