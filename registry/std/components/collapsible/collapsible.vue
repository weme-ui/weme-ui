<script lang="ts" setup>
import type { CollapsibleEmits, CollapsibleProps } from './collapsible.props'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useCollapsibleStyle } from './collapsible.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CollapsibleProps>(), {
  orientation: 'bottom',
  defaultOpen: false,
})

const emits = defineEmits<CollapsibleEmits>()

const delegated = reactiveOmit(props, 'asChild', 'class', 'ui', 'orientation')
const forwarded = useForwardPropsEmits(delegated, emits)
const ui = computed(() => useCollapsibleStyle())

const [DefineTrigger, ReuseTrigger] = createReusableTemplate()
</script>

<template>
  <DefineTrigger v-slot="{ open }">
    <CollapsibleTrigger :as-child="asChild" :class="cn(ui.trigger(), props.ui?.trigger)">
      <slot name="trigger" :open="open" />
    </CollapsibleTrigger>
  </DefineTrigger>

  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded" :class="cn(ui.base(), props.class, props.ui?.base)">
    <ReuseTrigger v-if="orientation === 'bottom'" :open="open" />

    <CollapsibleContent :class="cn(ui.content(), props.ui?.content)">
      <slot />
    </CollapsibleContent>

    <ReuseTrigger v-if="orientation === 'top'" :open="open" />
  </CollapsibleRoot>
</template>
