<script lang="ts" setup>
import { useBreadcrumbStyle } from './breadcrumb.style'

const { path } = defineProps<{
  path: string
}>()

const breadcrumbs = computed(() => useBreadcrumb(path))
const ui = useBreadcrumbStyle()
</script>

<template>
  <ul :class="ui.base()">
    <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.to">
      <li>
        <NuxtLink :to="breadcrumb.to" :class="ui.link({ highlight: breadcrumb.to === path })">
          {{ breadcrumb.label }}
        </NuxtLink>
      </li>
      <li v-if="index < breadcrumbs.length - 1" :class="ui.separator()">
        /
      </li>
    </template>
  </ul>
</template>
