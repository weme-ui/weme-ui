<script lang="ts" setup>
import type { AlertProps } from '../ui/alert/alert.props'
import type { AlertStyleProps } from '../ui/alert/alert.style'
import { useAlertStyle } from '~/styles/content/alert.style'

const props = defineProps<{
  href?: AlertProps['href']
  color?: AlertStyleProps['color']
  type?: AlertProps['type']
  class?: any
}>()

const color = computed(() => props.type || props.color)
const ui = useAlertStyle({ color: color.value })
</script>

<template>
  <UiAlert :class="cn('b-dashed mb-6', $props.class)" :href="href" :type="type" :color="color" :ui="{ wrapper: ui.wrapper() }">
    <ProseIcon v-if="!!href" name="external" :class="ui.externalIcon()" />
    <slot mdc-unwrap="p" />
  </UiAlert>
</template>
