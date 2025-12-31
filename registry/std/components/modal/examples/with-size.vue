<script lang="ts" setup>
import Button from '../../button/button.vue'
import Modal from '../modal.vue'

const sizes = [
  'sm',
  'md',
  'lg',
] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Modal title="Title" description="Description" :size="size">
        <Button>
          {{ size }}
        </Button>

        <template #content>
          <div>Content</div>
        </template>

        <template #footer>
          <Button label="Cancel" variant="plain" />
          <Button label="Ok" radius="md" />
        </template>
      </Modal>
    </template>
  </div>
</template>
