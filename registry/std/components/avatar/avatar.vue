<script lang="ts" setup>
import type { AvatarEmits, AvatarProps } from './avatar.props'
import { reactivePick } from '@vueuse/core'
import { AvatarFallback, AvatarImage, AvatarRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAvatarStyle } from './avatar.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AvatarProps>(), {
  color: 'primary',
  variant: 'soft',
  size: 'md',
  radius: 'full',
  delayMs: 200,
  icon: 'user',
})

const emits = defineEmits<AvatarEmits>()
const imageProps = useForwardPropsEmits(reactivePick(props, 'crossOrigin', 'referrerPolicy'), emits)

const ui = computed(() => useAvatarStyle(props))
</script>

<template>
  <AvatarRoot :as="as" :class="cn(ui.base(), props.class, props.ui?.base)">
    <AvatarImage
      v-if="src"
      v-bind="imageProps"
      :src="src"
      :alt="alt"
      :class="cn(ui.image(), props.ui?.image)"
    />

    <AvatarFallback :delay-ms="delayMs" :class="cn(ui.fallback(), props.ui?.fallback)">
      <slot v-if="$slots.default || fallback">
        {{ fallback }}
      </slot>
      <slot v-else name="icon">
        <Icon :name="icon" class="size-5" />
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
