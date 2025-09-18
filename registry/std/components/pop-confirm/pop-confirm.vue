<script lang="ts" setup>
import type { PopConfirmEmits, PopConfirmProps } from './pop-confirm.props'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import Popover from '../popover/popover.vue'
import { usePopConfirmStyle } from './pop-confirm.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopConfirmProps>(), {
  okButtonText: '确定',
  cancelButtonText: '取消',
  side: 'top',
  showArrow: true,
  loading: false,
  disabled: false,
  inverse: false,
})

const emits = defineEmits<PopConfirmEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'content', 'type', 'icon', 'okButtonText', 'cancelButtonText', 'loading', 'disabled', 'inverse')
const forwarded = useForwardPropsEmits(delegated, emits)

const resolvedIcon = computed(() => props.icon || props.type)
const ui = computed(() => usePopConfirmStyle(props))
</script>

<template>
  <Popover
    v-bind="forwarded"
    :class="cn(ui.base(), props.class, props.ui?.base)"
    :ui="{
      arrow: cn(ui.arrow(), props.ui?.arrow),
      trigger: cn(ui.trigger(), props.ui?.trigger),
    }"
    as-child
  >
    <template #trigger>
      <slot />
    </template>

    <div :class="cn(ui.content(), props.ui?.content)">
      <slot name="icon">
        <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      {{ content }}
    </div>

    <div class="flex justify-end gap-2">
      <Button
        :color="type"
        :variant="inverse ? 'outline' : 'soft'"
        :class="cn(ui.cancel(), props.ui?.cancel)"
        :disabled="loading || disabled"
        size="sm"
      >
        {{ cancelButtonText }}
      </Button>

      <Button
        :color="type"
        :variant="inverse ? 'inverse' : 'solid'"
        :loading="loading"
        :disabled="disabled"
        :class="cn(ui.ok(), props.ui?.ok)"
        size="sm"
      >
        {{ okButtonText }}
      </Button>
    </div>
  </Popover>
</template>
