<script lang="ts" setup>
import { useCardStyle } from '~/styles/content/card.style'

defineProps<{
  icon?: string
  title?: string
  description?: string
  to?: string
  target?: '_blank' | '_self'
  rel?: string
  class?: any
}>()

const ui = useCardStyle()
</script>

<template>
  <div :class="ui.base({ linkable: !!to, class: $props.class })">
    <NuxtLink v-if="to" :to="to" :target="target" :rel="rel" class="abs inset-0" />
    <ProseIcon v-if="icon" :name="icon" :class="ui.icon()" />
    <ProseIcon v-if="!!to" name="external" :class="ui.externalIcon()" />
    <h3 v-if="title" :class="ui.title()">
      {{ title }}
    </h3>
    <p v-if="description" :class="ui.description()">
      {{ description }}
    </p>
  </div>
</template>
