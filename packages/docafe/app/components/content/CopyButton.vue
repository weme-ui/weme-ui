<script lang="ts" setup>
import type { CopyButtonSlots } from '~/styles/copy-button.style'
import { AnimatePresence, Motion } from 'motion-v'
import { useCopyButtonStyle } from '~/styles/copy-button.style'

const props = defineProps<{
  code: string
  inset?: boolean
  class?: any
  ui?: Partial<CopyButtonSlots>
}>()

const { copy } = useClipboard()

const done = ref(false)

const ui = computed(() => useCopyButtonStyle({
  inset: props.inset,
}))

async function onClick() {
  if (done.value)
    return

  await copy(props.code.trim().replace(/^\$ /, ''))

  done.value = true

  setTimeout(() => {
    done.value = false
  }, 2000)
}
</script>

<template>
  <AnimatePresence
    as="button"
    :class="cn(ui.base(), $props.class, $props.ui?.base)"
    mode="wait"
    multiple
    @click="onClick"
  >
    <Motion
      v-if="done"
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.5 }"
      :class="ui.icon()"
    >
      <AppIcon name="check" :class="ui.success()" />
    </Motion>

    <Motion
      v-else
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.5 }"
      :class="ui.icon()"
    >
      <AppIcon name="lucide:clipboard" :class="ui.copy()" />
    </Motion>
  </AnimatePresence>
</template>
