<script lang="ts" setup>
import { useToast } from '~/composables/use-toast'
import Button from '../../button/button.vue'

const { add } = useToast()
const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-4">
    <Button
      v-for="color in colors"
      :key="color"
      :color="color"
      :label="color"
      @click="add({
        icon: 'lucide:alarm-clock',
        title: 'Info',
        description: 'Description',
        color,
      })"
    />
  </div>
</template>
