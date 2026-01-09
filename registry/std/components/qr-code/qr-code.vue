<script lang="ts" setup>
import type { QrCodeProps } from './qr-code.props'
import { defu } from 'defu'
import QRCode from 'qrcode'
import { computed, shallowRef, watch } from 'vue'
import Spinner from '../spinner/spinner.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<QrCodeProps>()
const src = shallowRef<string>('')
const value = computed(() => props.value)
const options = computed(() => defu(props.options, { margin: 3, errorCorrectionLevel: 'H' }))

watch(
  [value, options],
  async ([newValue, newOptions]) => {
    if (import.meta.client) {
      src.value = await QRCode.toDataURL(
        newValue,
        newOptions as QRCode.QRCodeToDataURLOptions,
      )
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <Spinner v-if="!src" />
  <img
    v-else
    v-bind="$attrs"
    data-slot="qr-code"
    :src="src"
    :class="props.class"
    aria-label="QR Code"
  >
</template>
