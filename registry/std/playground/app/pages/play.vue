<script lang="ts" setup>
const loading = ref(true)
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiSpinner v-model="loading" description="Loading..." />
    <UiSpinner v-model="loading" description="Loading...">
      <UiStack orientation="horizontal" class="gap-4">
        <UiSkeleton variant="circle" class="size-16" />
        <UiStack class="w-60">
          <UiSkeleton variant="text" class="w-1/2" />
          <UiSkeleton variant="text" :lines="2" />
        </UiStack>
      </UiStack>
    </UiSpinner>
  </Container>
</template>
