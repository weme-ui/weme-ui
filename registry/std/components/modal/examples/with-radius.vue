<script lang="ts" setup>
import Button from '../../button/button.vue'
import Modal from '../modal.vue'

const radiuses = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Modal title="Title" description="Description" :radius="radius">
        <Button>
          {{ radius }}
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
