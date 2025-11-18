<script lang="ts" setup>
const props = defineProps<{
  id?: string
  class?: any
}>()

const { headings } = useRuntimeConfig().public?.mdc || {}

const generate = computed(() =>
  props.id
  && (
    (
      typeof headings?.anchorLinks === 'boolean'
      && headings?.anchorLinks === true
    )
    || (
      typeof headings?.anchorLinks === 'object'
      && headings?.anchorLinks?.h6
    )
  ),
)
</script>

<template>
  <UiTypography :id="id" as="h6" :class="cn('mt-12 mb-1 scroll-mt-20')">
    <a v-if="id && generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
  </UiTypography>
</template>
