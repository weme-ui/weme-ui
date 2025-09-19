<script lang="ts" setup>
import type { ModalEmits, ModalProps } from './modal.props'
import { reactivePick } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import ScrollArea from '../scroll-area/scroll-area.vue'
import { useModalMotions } from './modal.motions'
import { useModalStyle } from './modal.style'

const props = withDefaults(defineProps<ModalProps>(), {
  variant: 'normal',
  side: 'center',
  radius: 'lg',
  translucent: false,
  closable: false,
  overlay: true,
})

const emits = defineEmits<ModalEmits>()

const delegated = reactivePick(props, 'defaultOpen', 'modal', 'open')
const forwarded = useForwardPropsEmits(delegated, emits)
const motions = useModalMotions(props.variant)

const ui = computed(() => useModalStyle({
  ...props,
  translucent: !!props.translucent,
  bordered: !!props.bordered,
}))
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="forwarded">
    <DialogTrigger v-bind="triggerProps" :class="cn(ui.trigger(), props.ui?.trigger)" :as-child="asChild">
      <slot />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps">
      <AnimatePresence>
        <DialogOverlay v-bind="overlayProps" :class="cn(ui.overlay(), props.ui?.overlay)">
          <Motion v-bind="motions.overlay" />
        </DialogOverlay>

        <DialogContent v-bind="contentProps" as-child>
          <Motion v-bind="motions.content[side]" :class="cn(ui.base(), props.class, props.ui?.base)">
            <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
              <header :class="cn(ui.header(), (!!title || $slots.title) ?? 'sr-only', props.ui?.header)">
                <slot name="header" :open="open" :close="close">
                  <div v-if="icon || $slots.icon" :class="cn(ui.icon(), props.ui?.icon)">
                    <slot name="icon">
                      <Icon v-if="icon" :name="icon" />
                    </slot>
                  </div>

                  <div class="flex-1">
                    <DialogTitle
                      :class="cn(ui.title(), (!!title || $slots.title) ?? 'sr-only', props.ui?.title)"
                    >
                      <slot name="title">
                        {{ title }}
                      </slot>
                    </DialogTitle>

                    <DialogDescription
                      :class="cn(ui.description(), (!!description || $slots.description) ?? 'sr-only', props.ui?.description)"
                    >
                      <slot name="description">
                        {{ description }}
                      </slot>
                    </DialogDescription>
                  </div>

                  <DialogClose v-if="closable" :class="cn(ui.close(), props.ui?.close)">
                    <slot name="close">
                      <Icon name="close" />
                    </slot>
                  </DialogClose>
                </slot>
              </header>

              <ScrollArea :class="cn(ui.body(), props.ui?.body)">
                <div :class="cn(ui.content(), props.ui?.content)">
                  <slot name="content" :open="open" :close="close" />
                </div>
              </ScrollArea>

              <footer v-if="$slots.footer" :class="cn(ui.footer(), props.ui?.footer)">
                <slot name="footer" :open="open" :close="close" />
              </footer>
            </div>
          </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
