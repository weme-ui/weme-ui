<script lang="ts" setup>
import type { ItemProps } from './item.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import { useItemStyle } from './item.style'

const props = withDefaults(defineProps<ItemProps>(), {
  as: 'dl',
  color: 'primary',
  variant: 'outline',
  size: 'md',
  radius: 'lg',
  align: 'start',
  arrowIcon: 'right',
  loadingIcon: 'loading',
})

const clickable = computed(() => !!props.href)

const ui = computed(() => useItemStyle({
  ...props,
  clickable: clickable.value,
  disabled: toBoolValue(props.disabled),
  loading: toBoolValue(props.loading),
}))
</script>

<template>
  <Primitive :as="as" :class="cn(ui.base(), props.ui?.base, props.class)">
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
    <div v-if="$slots.content || clickable" :class="cn(ui.content(), props.ui?.content)">
      <slot name="content">
        {{ content }}
      </slot>
      <Icon v-if="loading" :name="loadingIcon" class="animate-spin" />
      <Icon v-else-if="clickable" :name="arrowIcon" />
    </div>
    <LinkOverlay v-if="href && !disabled" :href="href" :target="target" :rel="rel" />
  </Primitive>
</template>
