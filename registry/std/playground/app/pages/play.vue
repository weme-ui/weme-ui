<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiCard variant="normal" size="md" title="Espresso" description="Strong and bold." class="w-100" translucent>
      <template #start>
        <UiImage src="https://images.unsplash.com/photo-1605206319326-527391db8e36?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" fit="contain" class="aspect-[3/2]" />
      </template>

      <UiSeparator label="COFFEE" />

      <template #action>
        <small class="text-warning">$3.99</small>
      </template>

      <template #footer>
        <UiGroup grow>
          <UiButton label="Buy now" />
          <UiButton label="Add to cart" variant="soft" />
        </UiGroup>
      </template>
    </UiCard>
  </Container>
</template>
