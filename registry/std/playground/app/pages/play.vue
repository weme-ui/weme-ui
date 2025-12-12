<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiEmptyState icon="solar:bag-3-bold-duotone" title="Hello World" description="This is a description." size="md" :ui="{ indicator: 'c-secondary size-16' }">
      <UiButtonGroup color="secondary" class="mt-4">
        <UiButton variant="solid">
          Apply
        </UiButton>
        <UiButton>Cancel</UiButton>
      </UiButtonGroup>
    </UiEmptyState>
  </Container>
</template>
