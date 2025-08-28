<script lang="ts" setup>
import { useCardStyle } from '~/styles/card.style'

const props = defineProps<{
  title: string
  icon?: string
  href?: string
}>()

const isExternal = computed(() => props.href?.startsWith('http'))

const ui = computed(() => useCardStyle({
  clickable: !!props.href,
}))
</script>

<template>
  <NuxtLink
    :href
    :target="isExternal ? '_blank' : undefined"
    :class="ui.base()"
  >
    <div v-if="$slots.icon || icon" :class="ui.icon()">
      <slot name="icon" mdc-unwrap="p">
        <AppIcon v-if="icon" :name="icon" />
      </slot>
    </div>

    <AppIcon v-if="isExternal" name="external" :class="ui.external()" />

    <div class="flex-(~ col)">
      <h2 :class="ui.title()">
        {{ title }}
      </h2>
      <p :class="ui.description()">
        <slot mdc-unwrap="p" />
      </p>
    </div>
  </NuxtLink>
</template>
