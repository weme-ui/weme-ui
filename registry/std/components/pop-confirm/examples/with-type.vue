<script lang="ts" setup>
import Button from '../../button/button.vue'
import PopConfirm from '../pop-confirm.vue'

const types = ['info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="type in types" :key="type">
      <PopConfirm
        :type="type"
        message="Are you sure you want to delete?"
        :confirm="{ label: 'Delete', color: type }"
      >
        <Button :label="type" />
      </PopConfirm>
    </template>
  </div>
</template>
