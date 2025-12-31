<script lang="ts" setup>
import Button from '../../button/button.vue'
import Modal from '../modal.vue'
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <Modal title="Title" description="Description">
      <Button>
        Normal
      </Button>

      <template #content>
        <div>Content</div>
      </template>

      <template #footer>
        <Button label="Cancel" variant="plain" />
        <Button label="Ok" radius="md" />
      </template>
    </Modal>

    <Modal title="Title" description="Description" variant="outline">
      <Button>
        Outline
      </Button>

      <template #content>
        <div>Content</div>
      </template>

      <template #footer>
        <Button label="Cancel" variant="plain" />
        <Button label="Ok" radius="md" />
      </template>
    </Modal>
  </div>
</template>
