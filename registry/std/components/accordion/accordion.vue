<script lang="ts" setup>
import type { AccordionEmits, AccordionProps } from './accordion.props'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAccordionStyle } from './accordion.style'

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'multiple',
  collapsible: true,
  color: 'neutral',
  variant: 'normal',
  align: 'start',
  radius: 'md',
})

const emits = defineEmits<AccordionEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'items', 'radius', 'align', 'variant', 'color')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useAccordionStyle(props))
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="cn(ui.base(), props.class, props.ui?.base)">
    <template v-for="item in items" :key="item.value">
      <AccordionItem
        v-slot="{ open }"
        :value="item.value"
        :disabled="item.disabled"
        :class="cn(ui.item(), props.ui?.item)"
      >
        <AccordionHeader :class="cn(ui.header(), props.ui?.header)">
          <AccordionTrigger :class="cn(ui.trigger(), props.ui?.trigger)">
            <div :class="cn(ui.icon(), props.ui?.icon)">
              <slot name="icon" v-bind="{ item, open }">
                <Icon v-if="item.icon" :name="item.icon" />
              </slot>
            </div>

            <div class="flex-(~ 1 col) items-start">
              <strong :class="cn(ui.title(), props.ui?.title)">
                {{ item.title }}
              </strong>
              <p :class="cn(ui.description(), props.ui?.description)">
                {{ item.description }}
              </p>
            </div>

            <div :class="cn(ui.arrow(), props.ui?.arrow)">
              <slot name="arrow" v-bind="{ item, open }">
                <Icon name="down" />
              </slot>
            </div>
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent :class="cn(ui.content(), props.ui?.content)">
          <div :class="cn(ui.contentInner(), props.ui?.contentInner)">
            <slot name="content" v-bind="{ item, open }">
              {{ item.content }}
            </slot>
          </div>
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>
