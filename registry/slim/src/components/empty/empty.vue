<script lang="ts" setup>
import type { EmptyProps } from './empty.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import IconTile from '../icon-tile/icon-tile.vue'
import { useEmptyStyle } from './empty.style'

const props = withDefaults(defineProps<EmptyProps>(), {
  size: 'md',
})

const iconProps = computed(() => {
  if (typeof props.icon === 'string') {
    return { icon: props.icon }
  }
  return props.icon
})

const iconSize = computed(() => props.size === 'sm' ? 'xs' : props.size === 'md' ? 'sm' : 'md')

const ui = computed(() => useEmptyStyle({
  size: props.size,
  unstyled: toBoolValue(props.unstyled),
}))
</script>

<template>
  <Primitive data-slot="empty" :class="cn(ui.root(), props.ui?.root, props.class)">
    <div :class="cn(ui.header(), props.ui?.header)">
      <slot name="header">
        <div v-if="!!$slots.media || icon" :class="cn(ui.media(), props.ui?.media)">
          <slot name="media">
            <IconTile v-if="icon" v-bind="{ ...iconProps }" variant="soft" :size="iconSize" />
          </slot>
        </div>
        <div v-if="!!$slots.title || title" :class="cn(ui.title(), props.ui?.title)">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="!!$slots.description || description" :class="cn(ui.description(), props.ui?.description)">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>
    <div v-if="!!$slots.content" :class="cn(ui.content(), props.ui?.content)">
      <slot name="content" />
    </div>
  </Primitive>
</template>
