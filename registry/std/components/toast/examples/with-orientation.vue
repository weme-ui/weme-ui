<script lang="ts" setup>
import { useToast } from '~/composables/use-toast'
import Button from '../../button/button.vue'

const { add } = useToast()
</script>

<template>
  <Button
    label="Add Toast"
    @click="add({
      title: 'Info',
      description: 'Description',
      actions: [
        { label: 'Action 1' },
        { label: 'Action 2' },
      ],
    })"
  />

  <Button
    class="ml-4"
    label="Add Toast"
    @click="add({
      orientation: 'vertical',
      title: 'Info',
      description: 'Description',
      actions: [
        { label: 'Action 1' },
        { label: 'Action 2' },
      ],
    })"
  />
</template>
