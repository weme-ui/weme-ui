<script lang="ts" setup>
import type { TimelineProps } from './timeline.props'
import type { IconBoxProps } from '~/types'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import IconBox from '../icon/icon-box.vue'
import Separator from '../separator/separator.vue'
import { useTimelineStyle } from './timeline.style'

const props = withDefaults(defineProps<TimelineProps>(), {
  color: 'primary',
  orientation: 'vertical',
  size: 'md',
  reverse: false,
  items: () => [],
  iconProps: () => ({
    variant: 'soft',
    radius: 'full',
    size: 'md',
  }),
})

const delegated = reactivePick(props, 'as', 'asChild')

const iconProps = computed(() => defu(
  props.iconProps,
  {
    color: props.color,
    size: props.size,
    variant: 'soft',
    radius: 'full',
  },
)) as ComputedRef<Partial<IconBoxProps>>

const ui = computed(() => useTimelineStyle({
  ...props,
  reverse: toBoolValue(props.reverse),
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :data-orientation="orientation"
    :data-reserve="toBoolValue(reverse) ? '' : undefined"
    :class="ui.base({ class: cn(props.class, props.ui?.base) })"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="ui.item({ class: cn(props.ui?.item, item.class, item.ui?.item) })"
    >
      <div :class="ui.wrapper({ class: cn(props.ui?.wrapper, item.ui?.wrapper) })">
        <div v-if="item.icon" :class="ui.indicator({ class: cn(props.ui?.indicator, item.ui?.indicator) })">
          <slot :name="(item.slot ? `${item.slot}-indicator` : 'indicator')" :item="item">
            <IconBox
              v-bind="defu({}, item.iconProps, iconProps)"
              :color="item.color || iconProps.color"
              :name="item.icon"
              :class="ui.icon({ class: cn(props.ui?.icon, item.ui?.icon) })"
            />
          </slot>
        </div>
        <Separator
          v-if="index < items.length - 1"
          v-bind="defu({}, item.separatorProps, separatorProps)"
          :orientation="orientation"
          :class="ui.separator({ class: cn(props.ui?.separator, item.ui?.separator) })"
        />
      </div>

      <div :class="ui.content({ class: cn(props.ui?.content, item.ui?.content) })">
        <div v-if="item.date" :class="ui.date({ class: cn(props.ui?.date, item.ui?.date) })">
          <slot :name="(item.slot ? `${item.slot}-date` : 'date')" :item="item">
            {{ item.date }}
          </slot>
        </div>
        <div v-if="item.title" :class="ui.title({ class: cn(props.ui?.title, item.ui?.title) })">
          <slot :name="(item.slot ? `${item.slot}-title` : 'title')" :item="item">
            {{ item.title }}
          </slot>
        </div>
        <div v-if="item.description" :class="ui.description({ class: cn(props.ui?.description, item.ui?.description) })">
          <slot :name="(item.slot ? `${item.slot}-description` : 'description')" :item="item">
            {{ item.description }}
          </slot>
        </div>
      </div>
    </div>
  </Primitive>
</template>
