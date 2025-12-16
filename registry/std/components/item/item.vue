<script lang="ts" setup>
import type { ItemProps } from './item.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import { useItemStyle } from './item.style'

const props = withDefaults(defineProps<ItemProps>(), {
  color: 'primary',
  variant: 'plain',
  size: 'md',
  radius: 'lg',
  align: 'center',
  arrowIcon: 'right',
  loadingIcon: 'loading',
})

const clickable = computed(() => !!props.href || !!props.clickable)

const ui = computed(() => useItemStyle({
  ...props,
  clickable: clickable.value,
  disabled: toBoolValue(props.disabled),
  loading: toBoolValue(props.loading),
}))
</script>

<template>
  <Primitive :as="as" :class="cn(ui.base(), props.ui?.base, props.class)">
    <dl :class="cn(ui.item(), props.ui?.item)">
      <slot v-if="$slots.indicator || icon" name="indicator">
        <Icon v-if="icon" :name="icon" :class="cn(ui.indicator(), props.ui?.indicator)" />
      </slot>
      <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
        <slot name="content">
          <dt v-if="$slots.label || label" :class="cn(ui.label(), props.ui?.label)">
            <slot name="label">
              {{ label }}
            </slot>
          </dt>
          <dd v-if="$slots.description || description" :class="cn(ui.description(), props.ui?.description)">
            <slot name="description">
              {{ description }}
            </slot>
          </dd>
        </slot>
      </div>
      <div v-if="$slots.default || clickable || showArrow || loading" :class="cn(ui.content(), props.ui?.content)">
        <slot>
          {{ content }}
        </slot>
        <Icon v-if="loading" :name="loadingIcon" class="animate-spin" />
        <Icon v-else-if="clickable && showArrow" :name="arrowIcon" />
      </div>
    </dl>
    <LinkOverlay v-if="href && !disabled" :href="href" :target="target" :rel="rel" />
  </Primitive>
</template>
