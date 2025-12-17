<script lang="ts" setup>
import type { BannerEmits, BannerProps } from './banner.props'
import { useHead } from '#imports'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, watch } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import { useBannerStyle } from './banner.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BannerProps>(), {
  color: 'primary',
  variant: 'solid',
  closable: false,
})

const emits = defineEmits<BannerEmits>()
const delegated = reactivePick(props, 'as')
const forwarded = useForwardPropsEmits(delegated, emits)
const { t } = useLocale()

const id = computed(() => `banner-${props.id || '1'}`)

const ui = computed(() => useBannerStyle({
  ...props,
  closable: !!props.href,
}))

watch(id, (newId) => {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined')
    return

  const isClosed = localStorage.getItem(newId) === 'true'
  const htmlElement = document.querySelector('html')

  htmlElement?.classList.toggle('hide-banner', isClosed)
})

useHead({
  script: [{
    key: 'pre-hydrate-banner',
    innerHTML: `
            if (localStorage.getItem('${id.value}') === 'true') {
              document.querySelector('html').classList.add('hide-banner')
            }`.replace(/\s+/g, ' '),
    type: 'text/javascript',
  }],
})

function onClose() {
  localStorage.setItem(id.value, 'true')
  document.querySelector('html')?.classList.add('hide-banner')
  emits('close')
}
</script>

<template>
  <Primitive v-bind="forwarded" :class="cn(ui.base(), props.ui?.base, props.class)">
    <div :class="cn(ui.left(), props.ui?.left)" />

    <div :class="cn(ui.center(), props.ui?.center)">
      <slot name="icon">
        <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      <h3 v-if="title || !!$slots.title" :class="cn(ui.title(), props.ui?.title)">
        <slot name="title">
          {{ title }}
        </slot>
      </h3>

      <div v-if="actions?.length || !!$slots.actions" :class="cn(ui.actions(), props.ui?.actions)">
        <slot name="actions">
          <Button v-for="(action, index) in actions" :key="index" :color="color" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div :class="cn(ui.right(), props.ui?.right)">
      <button v-if="closable || !!$slots.close" :aria-label="t('banner.close')" :class="cn(ui.close(), props.ui?.close)" @click="onClose">
        <slot name="close">
          <Icon v-if="closable" name="close" />
        </slot>
      </button>
    </div>

    <LinkOverlay v-if="href" :href="href" :target="target" :rel="rel" />
  </Primitive>
</template>

<style scoped>
.hide-banner .banner {
  display: none;
}
</style>
