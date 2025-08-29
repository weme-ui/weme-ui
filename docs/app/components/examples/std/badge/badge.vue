<script lang="ts" setup>
import type { BadgeProps } from '@registry/std/components/badge/badge.props'
import Badge from '@registry/std/components/badge/badge.vue'

defineOptions({
  inheritAttrs: false,
})

defineProps<BadgeProps>()
</script>

<template>
  <div>
    <Badge v-bind="$props" />
  </div>
</template>
