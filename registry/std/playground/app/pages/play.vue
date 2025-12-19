<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <TooltipProvider>
      <UiTooltip content="这是一条提示" arrow loading default-open>
        <UiButton label="hover me" />
      </UiTooltip>
    </TooltipProvider>
  </Container>
</template>
