<script lang="ts" setup>
import type { TimelineItem, TimelineProps } from './timeline.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Avatar from '../avatar/avatar.vue'
import Icon from '../icon/icon.vue'
import { useTimelineStyle } from './timeline.style'

const props = withDefaults(defineProps<TimelineProps>(), {
  color: 'primary',
  variant: 'solid',
  size: 'sm',
  pendingIcon: 'loading',
  pendingTitle: '',
  reversed: false,
  pending: false,
  items: () => [],
})

const delegated = reactivePick(props, 'as', 'asChild')

const items = computed<TimelineItem[]>(() => {
  const pending = toBoolValue(props.pending)
    ? {
        icon: props.pendingIcon,
        title: props.pendingTitle,
        description: props.pendingDescription,
        ui: {
          icon: 'animate-spin',
        },
      }
    : null

  return [...props.items, pending].filter(Boolean) as TimelineItem[]
})

const ui = computed(() => useTimelineStyle({
  ...props,
  reversed: toBoolValue(props.reversed),
  hasIcon: items.value.some(item => !!item.icon || !!item.avatar),
}))
</script>

<template>
  <Primitive v-bind="delegated" data-slot="timeline" :class="cn(ui.root(), props.ui?.root, props.class)">
    <dl
      v-for="(item, index) in items"
      :key="index"
      data-slot="timeline-item"
      :class="cn(ui.item(), props.ui?.item)"
      :data-order="index === 0
        ? 'first'
        : index === items.length - 1
          ? 'last'
          : 'middle'"
    >
      <div data-slot="timeline-connector" :class="cn(ui.connector({ color: item.color || color }), props.ui?.connector, item.ui?.connector)">
        <div data-slot="timeline-indicator" :class="cn(ui.indicator({ color: item.color || color }), props.ui?.indicator, item.ui?.indicator)">
          <slot name="indicator" v-bind="{ item, index }">
            <Avatar
              v-if="item.avatar"
              v-bind="typeof item.avatar === 'string' ? { src: item.avatar } : item.avatar"
              :color="item.color || color"
              :variant="item.variant || variant"
              :class="cn(ui.avatar(), props.ui?.avatar, item.ui?.avatar)"
            />
            <Icon
              v-else-if="item.icon"
              :name="item.icon"
              :class="cn(ui.icon(), props.ui?.icon, item.ui?.icon)"
            />
          </slot>
        </div>
        <div
          v-if="reversed ? index > 0 : index < items.length - 1"
          data-slot="timeline-separator"
          :class="cn(ui.separator(), props.ui?.separator, item.ui?.separator)"
        />
      </div>
      <div data-slot="timeline-content" :class="cn(ui.content(), props.ui?.content, item.ui?.content)">
        <dt data-slot="timeline-title" :class="cn(ui.title(), props.ui?.title, item.ui?.title)">
          <slot name="title" v-bind="{ item, index }">
            {{ item.title }}
          </slot>
        </dt>
        <dd
          v-if="item.description"
          data-slot="timeline-description"
          :class="cn(ui.description(), props.ui?.description, item.ui?.description)"
        >
          <slot name="description" v-bind="{ item, index }">
            {{ item.description }}
          </slot>
        </dd>
        <slot v-bind="{ item, index }" />
      </div>
    </dl>
  </Primitive>
</template>
