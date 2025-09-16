<script lang="ts" setup>
import { usePageTitleStyle } from './title.style'

defineProps<{
  icon?: string
  title?: string
  description?: string
  links?: DocsLink[]
}>()

const ui = usePageTitleStyle()
</script>

<template>
  <div :class="ui.base()">
    <div :class="ui.wrapper()">
      <AppIcon v-if="icon" :name="icon" />
      <h1 :class="ui.title()">
        {{ title }}
      </h1>
    </div>

    <p :class="ui.description()">
      {{ description }}
    </p>

    <ul v-if="links?.length" :class="ui.links()">
      <li v-for="link in links" :key="link.to">
        <UiBadge
          :icon="link.icon"
          :text="link.label"
          :href="link.to"
          :target="link.target"
          :rel="link.rel"
        />
      </li>
    </ul>
  </div>
</template>
