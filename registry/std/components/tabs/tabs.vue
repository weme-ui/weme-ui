<script lang="ts" setup>
import type { TabsEmits, TabsProps } from './tabs.props'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTabsStyle } from './tabs.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'normal',
  side: 'top',
  size: 'sm',
  radius: 'md',
  animate: true,
})

const emits = defineEmits<TabsEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'variant', 'radius', 'size', 'side', 'listProps', 'triggerProps', 'indicatorProps')
const forwarded = useForwardPropsEmits(delegated, emits)

const slots = useSlots()
const contents = computed(() => getChildrenSlots(slots.default?.()))

const orientation = computed(() =>
  props.side === 'top' || props.side === 'bottom'
    ? 'horizontal'
    : 'vertical',
)

const ui = computed(() => useTabsStyle({
  ...props,
  animate: !!props.animate,
}))

const [
  DefineTabsList,
  ReuseTabsList,
] = createReusableTemplate()
</script>

<template>
  <DefineTabsList>
    <TabsList v-bind="listProps" :class="cn(ui.list(), props.ui?.list)">
      <TabsIndicator v-bind="indicatorProps" :class="cn(ui.indicator(), props.ui?.indicator)" />
      <TabsTrigger
        v-for="content in contents"
        v-bind="triggerProps"
        :key="content.props!.value"
        :value="content.props!.value"
        :class="cn(ui.trigger(), props.ui?.trigger)"
      >
        <Icon v-if="content.props?.loading" name="loading" :class="cn(ui.loading(), props.ui?.loading)" />
        <Icon v-else-if="content.props?.icon" :name="content.props?.icon" :class="cn(ui.icon(), props.ui?.icon)" />
        <span :class="cn(ui.title(), props.ui?.title)">
          {{ content.props?.title }}
        </span>
      </TabsTrigger>

      <div v-if="$slots.actions" :class="cn(ui.actions(), props.ui?.actions)">
        <slot name="actions" />
      </div>
    </TabsList>
  </DefineTabsList>

  <TabsRoot v-bind="forwarded" :orientation="orientation" :class="cn(ui.base(), props.class, props.ui?.base)">
    <ReuseTabsList v-if="side === 'top' || side === 'left'" />

    <template v-for="content in contents" :key="content.props?.value">
      <component :is="content" :class="cn(ui.content(), props.ui?.content)" />
    </template>

    <ReuseTabsList v-if="side === 'bottom' || side === 'right'" />
  </TabsRoot>
</template>
