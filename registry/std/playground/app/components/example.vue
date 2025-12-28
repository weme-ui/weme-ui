<script lang="ts" setup>
defineProps<{
  icon?: string
  title?: string
  description?: string
  class?: any
}>()
</script>

<template>
  <div class="flex-(~ col) px-22">
    <div class="flex-(~ y-center) gap-4 py-3">
      <UiIconButton icon="arrowLeft" variant="ghost" radius="full" @click="$router.back()" />
      <UiSeparator orientation="vertical" class="h-5" />
      <UiIcon v-if="icon" :name="icon" class="size-4 text-default ml-2" />
      <h2 class="text-highlighted font-medium">
        {{ title }}
      </h2>
      <p v-if="description" class="text-(3 toned)">
        {{ description }}
      </p>
    </div>

    <div class="ring-(~ border) px-6 py-4 rounded-lg">
      <div :class="cn('gap-6', $props.class)">
        <slot />
      </div>
    </div>
  </div>
</template>
