<script lang="ts" setup>
import { useDefaultLayoutStyle } from './default.style'

const { page } = useContent()

const ui = computed(() => useDefaultLayoutStyle({
  fillContainer: !!page.value?.theme.fillContainer,
}))
</script>

<template>
  <div :class="ui.base()">
    <AppHeader />
    <slot />
    <AppFooter v-if="page?.theme.footer !== false" />
  </div>
</template>
