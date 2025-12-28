<script lang="ts" setup>
import type { ImagePreviewEmits, ImagePreviewProps } from './image-preview.props'
import { onKeyStroke, reactiveOmit } from '@vueuse/core'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Image from '../image/image.vue'
import Overlay from '../overlay/overlay.vue'
import { useImagePreviewStyle } from './image-preview.style'

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  closeOnEscape: true,
})

const emits = defineEmits<ImagePreviewEmits>()
const imageProps = reactiveOmit(props, 'previewSrc', 'placeholder', 'disabled', 'closeOnEscape', 'portal', 'class', 'ui')
const portalProps = usePortal(toRef(() => props.portal))
const ui = computed(() => useImagePreviewStyle(props))

const show = ref(false)
const loaded = ref(false)

if (props.closeOnEscape)
  onKeyStroke('Escape', onHidden)

function onShow() {
  if (props.disabled)
    return

  show.value = true
  emits('open')
  emits('update:show', true)
}

function onHidden() {
  if (props.disabled)
    return

  show.value = false
  emits('close')
  emits('update:show', false)
}
</script>

<template>
  <Image v-bind="imageProps" :class="cn(ui.base(), props.ui?.base, props.class)" data-slot="base" @click="onShow">
    <slot v-bind="{ ...imageProps }" />
  </Image>

  <Teleport :to="portalProps.to" :disabled="portalProps.disabled">
    <div v-if="show" :class="cn(ui.preview(), props.ui?.preview)" data-slot="preview">
      <div v-show="!loaded" :class="cn(ui.previewPlaceholder(), props.ui?.previewPlaceholder)" data-slot="previewPlaceholder">
        <slot name="placeholder">
          <template v-if="placeholder">
            {{ placeholder }}
          </template>
          <Icon v-else name="loading" :class="cn(ui.loading(), props.ui?.loading)" data-slot="loading" />
        </slot>
      </div>

      <Image
        v-show="loaded"
        :src="previewSrc || src"
        :class="cn(ui.previewImage(), props.ui?.previewImage)"
        data-slot="previewImage"
        @loading-status-change="(status) => loaded = status === 'loaded'"
      />

      <slot name="actions" />
    </div>
    <Overlay v-model="show" :class="cn(ui.overlay(), props.ui?.overlay)" data-slot="overlay" @click="onHidden" />
  </Teleport>
</template>
