<script lang="ts" setup>
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

defineProps<PrimitiveProps & {
  item: NavigationItem
  class?: any
}>()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :href="as === 'a' ? (item.redirect || item.path || '') : undefined"
    :class="$props.class"
  >
    <AppIcon v-if="item.icon" :name="item.icon" />
    <span>{{ item.title }}</span>
    <UiBadge
      v-if="item.badge"
      variant="outline"
      radius="full"
      size="xs"
      :icon="item.badge.icon"
      :text="item.badge.label"
    />
    <slot />
  </Primitive>
</template>
