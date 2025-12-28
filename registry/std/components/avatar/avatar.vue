<script lang="ts" setup>
import type { AvatarEmits, AvatarProps } from './avatar.props'
import { reactivePick } from '@vueuse/core'
import { AvatarFallback, AvatarImage, AvatarRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAvatarStyle } from './avatar.style'

const props = withDefaults(defineProps<AvatarProps>(), {
  color: 'primary',
  variant: 'solid',
  size: 'md',
  radius: 'full',
  icon: 'user',
})

const emits = defineEmits<AvatarEmits>()
const delegated = useForwardPropsEmits(reactivePick(props, 'crossOrigin', 'referrerPolicy'), emits)

const ui = computed(() => useAvatarStyle({
  color: props.color,
  variant: props.variant,
  size: props.size,
  radius: props.radius,
}))
</script>

<template>
  <AvatarRoot :as="as" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <AvatarImage v-if="src" v-bind="delegated" :src="src" :class="cn(ui.image(), props.ui?.image)" data-slot="image" />
    <AvatarFallback :delay-ms="delayMs" :class="cn(ui.fallback(), props.ui?.fallback)" data-slot="fallback">
      <slot v-if="$slots.default || fallback">
        {{ fallback }}
      </slot>
      <slot v-else name="icon">
        <Icon :name="icon" />
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
