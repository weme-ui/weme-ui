<script lang="ts" setup>
import type { AccordionEmits, AccordionProps } from './accordion.props'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAccordionStyle } from './accordion.style'

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: true,
  color: 'primary',
  variant: 'normal',
  size: 'md',
  radius: 'md',
  align: 'start',
  indicatorIcon: 'down',
  items: () => [],
})
const emits = defineEmits<AccordionEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'items', 'color', 'variant', 'size', 'radius', 'align', 'indicatorIcon')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useAccordionStyle(props))
const items = computed(() => props.items.map(
  (item, index) => ({
    ...item,
    value: item.value || `${index}`,
  }),
))
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="cn(ui.base(), props.ui?.base, props.class)">
    <template v-for="item in items" :key="item.value">
      <AccordionItem
        v-slot="{ open }"
        :value="item.value"
        :disabled="item.disabled"
        :unmount-on-hide="item.unmountOnHide"
        :class="cn(ui.item(), props.ui?.item)"
      >
        <AccordionHeader :class="cn(ui.header(), props.ui?.header)">
          <AccordionTrigger :class="cn(ui.trigger(), props.ui?.trigger)">
            <div v-if="$slots.icon || item.icon" :class="cn(ui.headerIconWrapper(), props.ui?.headerIconWrapper)">
              <slot name="icon" v-bind="{ item, open }">
                <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.headerIcon(), props.ui?.headerIcon)" />
              </slot>
            </div>
            <div :class="cn(ui.headerTitleWrapper(), props.ui?.headerTitleWrapper)">
              <slot name="title" v-bind="{ item, open }">
                <strong :class="cn(ui.headerTitle(), props.ui?.headerTitle)">
                  {{ item.title }}
                </strong>
              </slot>
              <slot name="description" v-bind="{ item, open }">
                <p v-if="item.description" :class="cn(ui.headerDescription(), props.ui?.headerDescription)">
                  {{ item.description }}
                </p>
              </slot>
            </div>
            <div :class="cn(ui.triggerIndicatorWrapper(), props.ui?.triggerIndicatorWrapper)">
              <slot name="indicator" v-bind="{ open }">
                <Icon :name="indicatorIcon" :class="cn(ui.triggerIndicator(), props.ui?.triggerIndicator)" />
              </slot>
            </div>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent :class="cn(ui.content(), props.ui?.content)">
          <div :class="cn(ui.contentBody(), props.ui?.contentBody)">
            <slot name="content" v-bind="{ item, open }">
              {{ item.content }}
            </slot>
          </div>
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>
