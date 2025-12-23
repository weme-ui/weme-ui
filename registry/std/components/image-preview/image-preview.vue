<script lang="ts" setup>
import type { ImagePreviewEmits, ImagePreviewProps } from './image-preview.props'
import { onKeyStroke, reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Image from '../image/image.vue'
import Overlay from '../overlay/overlay.vue'
import { useImagePreviewStyle } from './image-preview.style'

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  portal: 'body',
  closeOnEscape: true,
})
const emits = defineEmits<ImagePreviewEmits>()
const imageProps = reactiveOmit(props, 'previewSrc', 'placeholder', 'disabled', 'closeOnEscape', 'portal', 'class', 'ui')
const portalProps = usePortal(toRef(props, 'portal'))
const ui = computed(() => useImagePreviewStyle(props))

const show = ref(false)
const loaded = ref(false)

if (props.closeOnEscape)
  onKeyStroke('Escape', onHidden)

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

  <Teleport v-bind="portalProps">
    <div v-if="show" :class="cn(ui.preview(), props.ui?.preview)">
      <div v-show="!loaded" :class="cn(ui.previewPlaceholder(), props.ui?.previewPlaceholder)">
        <slot name="placeholder">
          <template v-if="placeholder">
            {{ placeholder }}
          </template>
          <Icon v-else name="loading" :class="cn(ui.loading(), props.ui?.loading)" />
        </slot>
      </div>

      <Image
        v-show="loaded"
        :src="previewSrc || src"
        :class="cn(ui.previewImage(), props.ui?.previewImage)"
        @loading-status-change="(status) => loaded = status === 'loaded'"
      />
    </div>
    <Overlay v-model="show" :class="cn(ui.overlay(), props.ui?.overlay)" @click="onHidden" />
  </Teleport>
</template>
