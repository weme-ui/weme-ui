<script lang="ts" setup>
import { useAppNavigationStyle } from './navigation.style'

const sidebar = useConfig('sidebar')

const ui = computed(() => useAppNavigationStyle({
  bordered: !!sidebar.value?.bordered,
}))
</script>

<template>
  <aside :class="ui.base()">
    Sidebar
  </aside>
</template>
