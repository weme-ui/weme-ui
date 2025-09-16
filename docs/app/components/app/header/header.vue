<script lang="ts" setup>
import { useHeaderStyle } from './header.style'

const config = useConfig()
const ui = computed(() => useHeaderStyle())
</script>

<template>
  <header :class="ui.base()">
    <div :class="ui.container()">
      <AppHeaderLogo :name="config.header?.name" :logo="config.header?.logo" />
      <AppHeaderNavigation :items="config.header?.navs" class="flex-1" />
      <AppHeaderLinks :links="config.socials" :github="config.github" />
    </div>
  </header>
</template>
