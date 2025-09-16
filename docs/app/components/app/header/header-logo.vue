<script lang="ts" setup>
import { useHeaderLogoStyle } from './header-logo.style'

defineProps<{
  name?: string
  logo?: string
}>()

const ui = useHeaderLogoStyle()
</script>

<template>
  <NuxtLink to="/" :title="name">
    <h1 :class="ui.base()">
      <AppLogo v-if="logo" :logo="logo" />
      <strong v-if="name" :class="ui.text()">
        {{ name }}
      </strong>
    </h1>
  </NuxtLink>
</template>
