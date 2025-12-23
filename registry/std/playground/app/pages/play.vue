<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiPopConfirm
      type="danger"
      icon="lucide:trash-2"
      message="Are you sure you want to delete?"
      :confirm="{ label: 'Delete', color: 'danger' }"
      :cancel="{ color: 'danger' }"
      @before-confirm="() => false"
      @confirm="console.log('confirm')"
      @cancel="console.log('cancel')"
    >
      <UiButton label="Delete" color="danger" variant="soft" />
    </UiPopConfirm>
  </Container>
</template>
