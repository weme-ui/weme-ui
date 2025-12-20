<script lang="ts" setup>
import { defineShortcuts } from '~/composables/define-shortcuts'
import { useToast } from '~/composables/use-toast'

const { add } = useToast()

defineShortcuts({
  c: addInfo,
})

function addInfo() {
  add({
    title: 'Info',
    description: 'This is an info toast.',
  })
}
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiToastProvider>
      <p class="text-sm">
        Press <UiKbd>c</UiKbd> to show toast.
      </p>
    </UiToastProvider>
  </Container>
</template>
