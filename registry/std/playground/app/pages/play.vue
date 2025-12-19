<script lang="ts" setup>
const open = ref(false)
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiPopover v-model:open="open" variant="outline" size="lg" :dismissible="false" class="w-$reka-popper-anchor-width">
      <template #anchor>
        <div>
          <input placeholder="Focus to open" class="h-10 w-full rounded-sm bg-elevated px-3" @focus="open = true" @blur="open = false">
        </div>
      </template>

      <template #content>
        <div class="h-30 bg-elevated rounded-md inset-shadow-xs" />
      </template>
    </UiPopover>
  </Container>
</template>
