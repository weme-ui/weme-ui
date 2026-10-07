<script lang="ts" setup>
import type { LinkProps } from './link.props'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useLinkStyle } from './link.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LinkProps>(), {
  color: 'accent',
  unstyled: false,
  externalIcon: 'ri:external-link-line',
})

const delegated = reactiveOmit(props, 'label', 'prefixIcon', 'suffixIcon', 'externalIcon', 'color', 'unstyled', 'hideExternalIcon', 'class', 'ui')

const isExternal = computed(() => typeof props.to === 'string' && (props.to.startsWith('http') || props.to.startsWith('://')))

const ui = computed(() => useLinkStyle({
  color: props.color,
  unstyled: toBoolValue(props.unstyled),
  external: isExternal.value && !props.suffixIcon,
}))
</script>

<template>
  <RouterLink
    v-slot="{ href, navigate }"
    v-bind="delegated"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    custom
  >
    <a v-bind="$attrs" :href="isExternal ? String(to) : href" @click="(e) => isExternal ? undefined : navigate(e)">
      <Icon v-if="prefixIcon" :name="prefixIcon" :class="cn(ui.prefixIcon(), props.ui?.prefixIcon)" />
      <slot>{{ label }}</slot>
      <template v-if="!hideExternalIcon">
        <Icon v-if="isExternal" :name="externalIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
        <Icon v-else-if="suffixIcon" :name="suffixIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
      </template>
    </a>
  </RouterLink>
</template>
