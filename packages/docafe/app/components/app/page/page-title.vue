<script lang="ts" setup>
import { usePageTitleStyle } from './page-title.style'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  icon?: string
  title?: string
  description?: string
  links?: Array<{
    label: string
    description?: string
    icon?: string
    to?: string
    rel?: string
    target?: DocafeConfigTarget
  }>
}>()

const ui = usePageTitleStyle()
</script>

<template>
  <div :class="ui.base()">
    <div class="flex-(~ y-center) gap-x-2">
      <AppIcon v-if="icon" :name="icon" :class="ui.icon()" />
      <h1 :class="ui.title()">
        {{ title }}
      </h1>
    </div>

    <p :class="ui.description()">
      {{ description }}
    </p>

    <ul v-if="links?.length" :class="ui.links()">
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to" :target="link.target" :rel="link.rel" class="flex-(~ y-center) gap-x-1">
          <AppIcon v-if="link.icon" :name="link.icon" />
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
