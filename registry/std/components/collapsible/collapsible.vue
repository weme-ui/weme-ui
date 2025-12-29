<script lang="ts" setup>
import type { CollapsibleEmits, CollapsibleProps } from './collapsible.props'
import { reactiveOmit } from '@vueuse/core'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useCollapsibleStyle } from './collapsible.style'

const props = withDefaults(defineProps<CollapsibleProps>(), {
  orientation: 'bottom',
  defaultOpen: false,
})

const emits = defineEmits<CollapsibleEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'orientation')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useCollapsibleStyle({
  disabled: toBoolValue(props.disabled),
}))
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <CollapsibleTrigger v-if="orientation === 'bottom'" :class="cn(ui.trigger(), props.ui?.trigger)" data-slot="trigger" as-child>
      <slot name="trigger" :open="open" />
    </CollapsibleTrigger>
    <CollapsibleContent :class="cn(ui.content(), props.ui?.content)" data-slot="content">
      <slot />
    </CollapsibleContent>
    <CollapsibleTrigger v-if="orientation === 'top'" :class="cn(ui.trigger(), props.ui?.trigger)" data-slot="trigger" as-child>
      <slot name="trigger" :open="open" />
    </CollapsibleTrigger>
  </CollapsibleRoot>
</template>
