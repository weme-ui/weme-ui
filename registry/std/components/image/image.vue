<script lang="ts" setup>
import type { ImageEmits, ImageProps } from './image.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, toRefs } from 'vue'
import { useImageLoadingStatus } from '~/composables/use-image-loading-status'
import { cn } from '~/utils/styles'
import { useImageStyle } from './image.style'

const props = withDefaults(defineProps<ImageProps>(), {
  as: 'img',
  fit: 'contain',
  radius: 'none',
  fallbackDelayMs: 0,
})

const emits = defineEmits<ImageEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'width', 'height', 'alt', 'referrerPolicy', 'loading')
const ui = computed(() => useImageStyle(props))

const showFallback = ref(props.fallbackDelayMs === undefined && !!props.fallbackSrc)
const { src, referrerPolicy, crossOrigin } = toRefs(props)
const imageLoadingStatus = useImageLoadingStatus({ src, referrerPolicy, crossOrigin })

watch(
  imageLoadingStatus,
  (newValue) => {
    emits('loadingStatusChange', newValue)
  },
  {
    immediate: true,
  },
)

watchEffect((onCleanup) => {
  if (props.fallbackSrc && import.meta.client) {
    const timerId = window.setTimeout(() => {
      showFallback.value = true
    }, props.fallbackDelayMs)

    onCleanup(() => {
      window.clearTimeout(timerId)
    })
  }
})
</script>

<template>
  <Primitive
    v-bind="delegated"
    :src="showFallback && imageLoadingStatus !== 'loaded' ? fallbackSrc : src"
    :class="cn(ui.base(), props.ui?.base, props.class)"
  >
    <slot />
  </Primitive>
</template>
