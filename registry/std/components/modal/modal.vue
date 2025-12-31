<script lang="ts" setup>
import type { ModalEmits, ModalProps } from './modal.props'
import { reactivePick } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useModalMotions } from './modal.motions'
import { useModalStyle } from './modal.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ModalProps>(), {
  variant: 'normal',
  placement: 'center',
  size: 'md',
  radius: 'lg',
  translucent: false,
  overlay: true,
  loadingIcon: 'loading',
  portal: true,
})

const emits = defineEmits<ModalEmits>()
const delegated = reactivePick(props, 'defaultOpen', 'modal', 'open')
const forwarded = useForwardPropsEmits(delegated, emits)
const motions = useModalMotions(props)

const portalProps = usePortal(toRef(() => props.portal))
const overlayProps = toRef(() => props.overlay)
const contentProps = toRef(() => props.content)

const ui = computed(() => useModalStyle({
  ...props,
  translucent: toBoolValue(props.translucent),
}))
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="forwarded">
    <DialogTrigger :class="cn(ui.trigger(), props.ui?.trigger)" data-slot="modal-trigger" as-child>
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps">
      <AnimatePresence>
        <DialogOverlay
          v-if="!!overlay"
          v-bind="typeof overlayProps === 'object' ? overlayProps : undefined"
          as-child
        >
          <Motion v-bind="motions.overlay" :class="cn(ui.overlay(), props.ui?.overlay)" data-slot="modal-overlay" />
        </DialogOverlay>

        <DialogContent v-bind="contentProps" as-child>
          <Motion v-bind="motions.content as any" :class="cn(ui.base(), props.ui?.base, props.class)" data-slot="modal-content">
            <slot name="start" />
            <div :class="cn(ui.wrapper(), props.ui?.wrapper)" data-slot="modal-wrapper">
              <header :class="cn((!!title || !!$slots.title) ? [ui.header(), props.ui?.header] : 'sr-only')" data-slot="modal-header">
                <slot name="header" v-bind="{ open, close }">
                  <div v-if="!!loading || !!icon || !!$slots.icon" :class="cn(ui.iconWrapper(), props.ui?.iconWrapper)" data-slot="modal-icon-wrapper">
                    <slot name="icon" v-bind="{ open, loading }">
                      <Icon v-if="!!loading" :name="loadingIcon" :class="cn(ui.loading(), props.ui?.loading)" />
                      <Icon v-else-if="!!icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
                    </slot>
                  </div>

                  <div :class="cn(ui.titleWrapper(), props.ui?.titleWrapper)" data-slot="modal-title-wrapper">
                    <DialogTitle :class="cn((!!title || $slots.title) ? [ui.title(), props.ui?.title] : 'sr-only')" data-slot="modal-title">
                      <slot name="title">
                        {{ title }}
                      </slot>
                    </DialogTitle>
                    <DialogDescription :class="cn((!!description || $slots.description) ? [ui.description(), props.ui?.description] : 'sr-only')" data-slot="modal-description">
                      <slot name="description">
                        {{ description }}
                      </slot>
                    </DialogDescription>
                  </div>

                  <DialogClose v-if="closable" :class="cn(ui.close(), props.ui?.close)" data-slot="modal-close">
                    <slot name="close">
                      <Icon name="close" />
                    </slot>
                  </DialogClose>
                </slot>
              </header>

              <div :class="cn(ui.content(), props.ui?.content)" data-slot="modal-content">
                <slot name="content" v-bind="{ open, loading, close }" />
              </div>

              <footer v-if="!!$slots.footer && variant === 'outline'" :class="cn(ui.footer(), props.ui?.footer)" data-slot="modal-footer">
                <slot name="footer" v-bind="{ open, loading, close }" />
              </footer>
            </div>

            <footer v-if="!!$slots.footer && variant === 'normal'" :class="cn(ui.footer(), props.ui?.footer)" data-slot="modal-footer">
              <slot name="footer" v-bind="{ open, loading, close }" />
            </footer>
          </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
