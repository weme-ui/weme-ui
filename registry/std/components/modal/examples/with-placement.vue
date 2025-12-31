<script lang="ts" setup>
import Button from '../../button/button.vue'
import Modal from '../modal.vue'

const placements = [
  'top',
  'right',
  'bottom',
  'left',
  'center',
] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="placement in placements" :key="placement">
      <Modal title="Title" description="Description" :placement="placement">
        <Button>
          {{ placement }}
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
