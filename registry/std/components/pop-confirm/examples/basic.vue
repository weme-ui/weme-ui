<script lang="ts" setup>
import Button from '../../button/button.vue'
import PopConfirm from '../pop-confirm.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <PopConfirm
      icon="lucide:trash-2"
      message="Are you sure you want to delete?"
      :confirm="{ label: 'Delete' }"
    >
      <Button label="Click" />
    </PopConfirm>
  </div>
</template>
