<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiStack class="w-120">
      <UiItem size="sm" icon="user" variant="plain" label="Label" description="This is a description." href="https://github.com" content="Allen" loading />
      <UiItem color="secondary" align="center" size="md" label="Label" description="This is a description." href="https://github.com" content="Allen" loading>
        <template #indicator>
          <UiIconBox name="user" radius="full" class="mr-3" />
        </template>
      </UiItem>
      <UiItem color="danger" icon="user" align="end" size="lg" label="Label" description="This is a description." href="https://github.com" content="Allen" />
    </UiStack>
  </Container>
</template>
