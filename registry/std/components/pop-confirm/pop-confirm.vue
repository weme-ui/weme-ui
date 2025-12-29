<script lang="ts" setup>
import type { PopoverContentProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { PopConfirmEmits, PopConfirmProps } from './pop-confirm.props'
import { reactiveOmit } from '@vueuse/core'
import { defu } from 'defu'
import { useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import Popover from '../popover/popover.vue'
import { usePopConfirmStyle } from './pop-confirm.style'

const props = withDefaults(defineProps<PopConfirmProps>(), { variant: 'outline', size: 'lg' })
const emits = defineEmits<PopConfirmEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'message', 'icon', 'content', 'type', 'confirm', 'cancel', 'onBeforeConfirm', 'onBeforeCancel')
const forwarded = useForwardPropsEmits(delegated, emits)

const open = ref(false)
const loading = ref(false)

const { t } = useLocale()

const contentProps = computed(() => defu(props.content || {}, {
  side: 'top',
}) as PopoverContentProps)

const confirmProps = computed(() => defu(props.confirm || {}, {
  label: t('popConfirm.confirm'),
  variant: 'solid',
  size: 'sm',
}) as ButtonProps)

const cancelProps = computed(() => defu(props.cancel || {}, {
  label: t('popConfirm.cancel'),
  variant: 'soft',
  size: 'sm',
}) as ButtonProps)

const icon = computed(() => {
  if (props.icon)
    return props.icon

  if (props.type === 'danger')
    return 'error'

  return props.type
})

const ui = computed(() => usePopConfirmStyle({
  type: props.type,
}))

async function onConfirm() {
  let proceed = true

  if (props.onBeforeConfirm) {
    loading.value = true
    const result = props.onBeforeConfirm()
    proceed = result instanceof Promise ? await result : result
  }

  if (proceed) {
    emits('confirm')
    open.value = false
    loading.value = false
  }
}

async function onCancel() {
  let proceed = true

  if (props.onBeforeCancel) {
    const result = props.onBeforeCancel()
    proceed = result instanceof Promise ? await result : result
  }

  if (proceed) {
    emits('cancel')
    open.value = false
    loading.value = false
  }
}
</script>

<template>
  <Popover
    v-bind="forwarded"
    :open="open"
    :content="contentProps"
    :class="cn(ui.base(), props.ui?.base, props.class)"
    mode="click"
    modal
    arrow
    @update:open="(val) => open = val"
  >
    <template #default>
      <slot :open="open" />
    </template>

    <template #content>
      <div :class="cn(ui.content(), props.ui?.content)">
        <slot name="indicator">
          <Icon v-if="icon" :name="icon" :class="cn(ui.indicator(), props.ui?.indicator)" />
        </slot>
        <slot name="message">
          {{ message }}
        </slot>
      </div>
      <div :class="cn(ui.actions(), props.ui?.actions)">
        <Button v-bind="cancelProps" @click="onCancel" />
        <Button v-bind="{ ...confirmProps, loading }" @click="onConfirm" />
      </div>
    </template>
  </Popover>
</template>
