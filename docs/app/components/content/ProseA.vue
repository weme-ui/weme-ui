<script lang="ts" setup>
const {
  href = '',
  external = false,
} = defineProps<{
  href?: string
  target?: DocsLinkTarget
  external?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="href"
    :target="target"
    :external="external"
    class="flex-(inline y-center) text-accent-9 font-medium underline-(~ dotted offset-6) hover:text-accent-10"
  >
    <slot />
    <UiIcon v-if="external || href.startsWith('http')" name="external" class="size-3.5 c-accent-8 ml-1 group-hover:c-accent-10" />
  </NuxtLink>
</template>
