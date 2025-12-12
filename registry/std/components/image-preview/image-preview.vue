<script lang="ts" setup>
import type { ImagePreviewEmits, ImagePreviewProps } from './image-preview.props'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Image from '../image/image.vue'
import Overlay from '../overlay/overlay.vue'
import { useImagePreviewStyle } from './image-preview.style'

const props = defineProps<ImagePreviewProps>()
const emits = defineEmits<ImagePreviewEmits>()
const imageProps = reactiveOmit(props, 'previewSrc', 'placeholder', 'disabled', 'portal', 'class', 'ui')
const ui = computed(() => useImagePreviewStyle(props))

const show = ref(false)
const loaded = ref(false)

function onShow() {
  show.value = true
  emits('open')
  emits('update:show', true)
}

function onHidden() {
  show.value = false
  emits('close')
  emits('update:show', false)
}
</script>

<template>
  <Image v-bind="imageProps" :class="cn(ui.base(), props.ui?.base, props.class)" @click="onShow">
    <slot v-bind="{ ...imageProps }" />
  </Image>

  <Overlay v-model="show" :to="portal" :disabled="disabled" :class="cn(ui.overlay(), props.ui?.overlay)" @click="onHidden">
    <div :class="cn(ui.preview(), props.ui?.preview)">
      <div v-show="!loaded" :class="cn(ui.previewPlaceholder(), props.ui?.previewPlaceholder)">
        <slot name="placeholder">
          {{ placeholder }}
        </slot>
      </div>

      <Image
        v-show="loaded"
        :src="previewSrc || src"
        :class="cn(ui.previewImage(), props.ui?.previewImage)"
        @loading-status-change="(status) => loaded = status === 'loaded'"
      />
    </div>
  </Overlay>
</template>
