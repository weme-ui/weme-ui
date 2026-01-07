<script lang="ts" setup>
import type { ChipboardEmits, ChipboardProps } from './clipboard.props'
import { reactiveOmit, useClipboard } from '@vueuse/core'
import { computed, ref } from 'vue'
import Button from '../button/button.vue'
import IconButton from '../icon-button/icon-button.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ChipboardProps>(), {
  copyIcon: 'copy',
  copiedIcon: 'check',
  variant: 'soft',
  size: 'md',
})

const emits = defineEmits<ChipboardEmits>()
const delegated = reactiveOmit(props, 'value', 'copyIcon', 'copiedIcon', 'copyText', 'copiedText', 'class')
const isTextButton = computed(
  () => props.copyText || props.copiedText,
)

const source = ref(props.value)
const { copy, copied } = useClipboard({ source })

function onCopy() {
  copy()
  emits('copy')
}
</script>

<template>
  <Button
    v-if="isTextButton"
    v-bind="delegated"
    data-slot="clipboard"
    :icon="copied ? copiedIcon : copyIcon"
    :class="props.class"
    @click="onCopy"
  >
    <slot>{{ copied ? copiedText : copyText }}</slot>
  </Button>
  <IconButton
    v-else
    v-bind="delegated"
    data-slot="clipboard"
    :icon="copied ? copiedIcon : copyIcon"
    :class="props.class"
    @click="onCopy"
  />
</template>
