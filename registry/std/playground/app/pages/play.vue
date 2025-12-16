<script lang="ts" setup>
const { add } = useToast()

function addToast() {
  add({
    variant: 'outline',
    color: 'secondary',
    icon: 'loading',
    title: 'Uploading file...',
    description: 'This may take a while.',
    closable: true,
    loading: true,
  })
}
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiButton @click="addToast">
      Add Toast
    </UiButton>
  </Container>
</template>
