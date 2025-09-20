<script lang="ts" setup>
import ToastProvider from '@registry/std/components/toast/toast-provider.vue'

const { add } = useToast()
</script>

<template>
  <ToastProvider />

  <div class="grid-(~ cols-6) gap-4">
    <UiButton
      variant="soft"
      @click="add({
        title: 'Title',
        description: 'Description',
      })"
    >
      Default
    </UiButton>

    <UiButton
      variant="soft"
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'neutral',
      })"
    >
      Neutral
    </UiButton>

    <UiButton
      variant="soft"
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'info',
      })"
    >
      Info
    </UiButton>

    <UiButton
      variant="soft"
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'success',
      })"
    >
      Success
    </UiButton>

    <UiButton
      variant="soft"
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'warning',
      })"
    >
      Warning
    </UiButton>

    <UiButton
      variant="soft"
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'error',
      })"
    >
      Error
    </UiButton>

    <UiButton
      @click="add({
        title: 'Title',
        description: 'Description',
        inverse: true,
      })"
    >
      Default
    </UiButton>

    <UiButton
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'neutral',
        inverse: true,
      })"
    >
      Neutral
    </UiButton>

    <UiButton
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'info',
        inverse: true,
      })"
    >
      Info
    </UiButton>

    <UiButton
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'success',
        inverse: true,
      })"
    >
      Success
    </UiButton>

    <UiButton
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'warning',
        inverse: true,
      })"
    >
      Warning
    </UiButton>

    <UiButton
      @click="add({
        title: 'Title',
        description: 'Description',
        color: 'error',
        inverse: true,
      })"
    >
      Error
    </UiButton>
  </div>
</template>
