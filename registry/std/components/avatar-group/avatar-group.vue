<script lang="ts" setup>
import type { AvatarGroupProps } from './avatar-group.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Avatar from '../avatar/avatar.vue'
import { useAvatarGroupStyle } from './avatar-group.style'

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  size: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')

const slots = useSlots()
const children = slots.default?.()

const hasMore = computed(() => props.max && (children?.length || 0) > props.max)
const items = computed(() => hasMore.value ? children?.slice(0, props.max) : children)
const count = computed(() => hasMore.value ? `${(children?.length || 0) - (props.max || 0)}+` : '0')

const ui = computed(() => useAvatarGroupStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <Avatar
      v-if="hasMore"
      :fallback="count"
      :color="color"
      :variant="variant"
      :size="size"
      :radius="radius"
      :delay-ms="delayMs"
      :class="cn(ui.item(), props.ui?.item)"
    />
    <template v-for="(item, index) in items" :key="index">
      <component
        :is="item"
        :color="color"
        :variant="variant"
        :size="size"
        :radius="radius"
        :delay-ms="delayMs"
        :cross-origin="crossOrigin"
        :referrer-policy="referrerPolicy"
        :class="cn(ui.item(), props.ui?.item)"
      />
    </template>
  </Primitive>
</template>
