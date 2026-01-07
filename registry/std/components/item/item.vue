<script lang="ts" setup>
import type { ItemProps } from './item.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
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
  <Primitive :as="as" data-slot="item" :class="cn(ui.root(), props.ui?.root, props.class)">
    <dl :class="cn(ui.item(), props.ui?.item)">
      <div v-if="$slots.indicator || icon" data-slot="item-indicator" :class="cn(ui.indicator(), props.ui?.indicator)">
        <slot name="indicator">
          <Icon v-if="icon" :name="icon" :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)" />
        </slot>
      </div>
      <div data-slot="item-wrapper" :class="cn(ui.wrapper(), props.ui?.wrapper)">
        <slot name="content">
          <dt v-if="$slots.title || title" data-slot="item-title" :class="cn(ui.title(), props.ui?.title)">
            <slot name="title">
              {{ title }}
            </slot>
          </dt>
          <dd v-if="$slots.description || description" data-slot="item-description" :class="cn(ui.description(), props.ui?.description)">
            <slot name="description">
              {{ description }}
            </slot>
          </dd>
        </slot>
      </div>
      <div v-if="$slots.default || clickable || arrow || loading" data-slot="item-content" :class="cn(ui.content(), props.ui?.content)">
        <slot>
          {{ content }}
        </slot>
        <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.loading(), props.ui?.loading)" />
        <Icon v-else-if="clickable || arrow" :name="arrowIcon" :class="cn(ui.arrow(), props.ui?.arrow)" />
      </div>
    </dl>
    <LinkOverlay v-if="href && !disabled" :href="href" :target="target" :rel="rel" :as-child="!!$slots['link-overlay']">
      <slot name="link-overlay" />
    </LinkOverlay>
  </Primitive>
</template>
