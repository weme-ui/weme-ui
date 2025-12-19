<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiTabs variant="pill" side="left" size="md" radius="md" class="w-120 h-50">
      <UiTabsContent icon="lucide:activity" title="Activity" value="1" active>
        Tab 1
      </UiTabsContent>
      <UiTabsContent icon="lucide:axis-3d" title="Axis 3D" value="2">
        Tab 2
      </UiTabsContent>

      <template #actions>
        <UiIconButton icon="info" size="md" variant="plain" />
      </template>
    </UiTabs>
  </Container>
</template>
