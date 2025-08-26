<script lang="ts" setup>
import { useDefaultLayoutStyle } from './default.style'

const theme = useConfig('theme')
const { page } = useContent()

const ui = computed(() => useDefaultLayoutStyle({
  fillContainer: !!theme.value?.fillContainer,
}))
</script>

<template>
  <div :class="ui.base()">
    <AppHeader />
    <slot />
    <AppFooter v-if="page?.footer?.enable !== false" />
  </div>
</template>

<style>
body {
  background-color: var(--ui-accent-1);
}
</style>
