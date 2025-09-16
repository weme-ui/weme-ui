<script lang="ts" setup>
import type { AvatarGroupProps } from './avatar-group.props'
import { reactiveOmit as reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useAvatarGroupStyle } from './avatar-group.style'
import Avatar from './avatar.vue'

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  size: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')

const slots = useSlots()
const children = slots.default?.()

const hasMore = computed(() => props.max && (children?.length || 0) > props.max)
const resolvedItems = computed(() => hasMore.value ? children?.slice(0, props.max) : children)
const moreCount = computed(() => hasMore.value ? `${(children?.length || 0) - (props.max || 0)}+` : '0')

const ui = computed(() => useAvatarGroupStyle(props))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :class="cn(ui.base(), props.class, props.ui?.base)"
  >
    <Avatar
      v-if="hasMore"
      :fallback="moreCount"
      :color="color"
      :variant="variant"
      :size="size"
      :radius="radius"
      :delay-ms="delayMs"
      :class="cn(ui.items(), props.ui?.items)"
    />
    <template v-for="(item, index) in resolvedItems" :key="index">
      <component
        :is="item"
        :color="color"
        :variant="variant"
        :size="size"
        :radius="radius"
        :delay-ms="delayMs"
        :class="cn(ui.items(), props.ui?.items)"
      />
    </template>
  </Primitive>
</template>
