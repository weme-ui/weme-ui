<script lang="ts" setup>
import { useAppBreadcrumbStyle } from './breadcrumb.style'

const props = defineProps<{
  path: string
}>()

const breadcrumbs = useBreadcrumb(props.path)
const ui = useAppBreadcrumbStyle()
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
