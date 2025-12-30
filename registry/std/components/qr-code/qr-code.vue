<script lang="ts" setup>
import type { QrCodeProps } from './qr-code.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import QRCode from 'qrcode'
import { Primitive } from 'reka-ui'
import { computed, shallowRef, watch } from 'vue'
import Spinner from '../spinner/spinner.vue'

const props = withDefaults(defineProps<QrCodeProps>(), { as: 'img' })
const delegated = reactivePick(props, 'as', 'asChild')

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
  <Primitive
    v-else
    v-bind="{ ...delegated, ...$attrs }"
    :src="src"
    :class="props.class"
    :alt="$attrs.alt || 'QR Code'"
    aria-label="QR Code"
    data-slot="qr-code"
  />
</template>
