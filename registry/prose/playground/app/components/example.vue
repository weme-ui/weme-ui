<script lang="ts" setup>
import IconButton from '@std/components/icon-button/icon-button.vue'
import Icon from '@std/components/icon/icon.vue'
import Separator from '@std/components/separator/separator.vue'

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
      <IconButton icon="arrowLeft" variant="ghost" radius="full" @click="$router.back()" />
      <Separator orientation="vertical" class="h-5" />
      <Icon v-if="icon" :name="icon" class="size-4 text-default ml-2" />
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
