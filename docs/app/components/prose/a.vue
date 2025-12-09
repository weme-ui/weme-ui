<script lang="ts" setup>
defineProps<{
  href?: string
  target?: '_blank' | '_parent' | '_self' | '_top' | null
  class?: any
}>()
</script>

<template>
  <UiLink v-bind="$props" :class="cn('group underline-(~ wavy offset-3)', $props.class)">
    <slot />
    <ProseIcon v-if="href?.startsWith('http') || target === '_blank'" name="external" class="size-3.5 c-neutral-8 group-hover:c-neutral" />
  </UiLink>
</template>
