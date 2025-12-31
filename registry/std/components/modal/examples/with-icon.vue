<script lang="ts" setup>
import Button from '../../button/button.vue'
import Modal from '../modal.vue'

const loading = ref(false)
</script>

<template>
  <div class="flex-(~ center)">
    <Modal icon="info" title="Title" description="Description" :loading="loading" translucent closable>
      <Button>
        Open
      </Button>

      <template #content>
        <div>Content</div>
      </template>

      <template #footer="{ close }">
        <Button label="Set loading" variant="plain" @click="loading = !loading" />
        <Button label="Ok" radius="md" @click="close" />
      </template>
    </Modal>
  </div>
</template>
