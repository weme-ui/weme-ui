<script lang="ts" setup>
import { useToast } from '~/composables/use-toast'
import Button from '../../button/button.vue'

const { add } = useToast()
const variants = ['solid', 'outline'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-4">
    <Button
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      :label="variant"
      @click="add({
        icon: 'lucide:alarm-clock',
        title: 'Info',
        description: 'Description',
        variant,
      })"
    />
  </div>
</template>
