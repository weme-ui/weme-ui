<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiItemGroup title="Profile" class="w-100">
      <template #actions>
        <UiIconButton icon="plus" variant="ghost" size="xs" radius="full" />
        <UiIconButton icon="refresh" variant="ghost" size="xs" radius="full" />
      </template>

      <UiItem label="Username" description="This is a description.">
        Allen luo
      </UiItem>
      <UiItem label="Username" description="This is a description.">
        Allen luo
      </UiItem>
      <UiItem label="Username" description="This is a description.">
        Allen luo
        <UiIconButton size="sm" variant="soft" icon="lucide:pencil" />
      </UiItem>

      <template #footer>
        * This is a footer.
      </template>
    </UiItemGroup>
  </Container>
</template>
