<script lang="ts" setup>
import { useNavigationStyle } from './navigation.style'

const sidebar = useConfig('sidebar')

const ui = computed(() => useNavigationStyle({
  bordered: !!sidebar.value?.bordered,
}))
</script>

<template>
  <aside :class="ui.base()">
    Sidebar
  </aside>
</template>
