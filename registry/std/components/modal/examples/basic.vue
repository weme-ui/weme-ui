<script lang="ts" setup>
import Button from '../../button/button.vue'
import Modal from '../modal.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <Modal title="Title" description="Description" translucent closable>
      <Button>
        Open
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
