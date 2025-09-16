<script lang="ts" setup>
import { useLinkStyle } from '~/styles/link.style'

const { id } = defineProps<{ id?: string }>()
const { headings } = useRuntimeConfig().public.mdc

const generate = computed(() =>
  id
  && (
    (
      typeof headings?.anchorLinks === 'boolean'
      && headings?.anchorLinks === true
    )
    || (
      typeof headings?.anchorLinks === 'object'
      && headings?.anchorLinks?.h5
    )
  ),
)

const ui = useLinkStyle()
</script>

<template>
  <UiHeading :id as="h5" :class="ui.base()">
    <NuxtLink v-if="generate" :to="`#${id}`" :class="ui.link()">
      <span :class="ui.anchor()" />
      <slot />
    </NuxtLink>

    <slot v-else />
  </UiHeading>
</template>
