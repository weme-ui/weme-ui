<script lang="ts" setup>
import type { TabsEmits, TabsProps } from './tabs.props'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { toBoolValue } from '~/utils/props'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTabsStyle } from './tabs.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'line',
  side: 'top',
  size: 'md',
  radius: 'md',
  animate: false,
})

const emits = defineEmits<TabsEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'variant', 'radius', 'size', 'side', 'animate', 'listProps', 'triggerProps', 'indicatorProps')
const forwarded = useForwardPropsEmits(delegated, emits)

const orientation = computed(() =>
  props.side === 'top' || props.side === 'bottom'
    ? 'horizontal'
    : 'vertical',
)

const slots = useSlots()
const contents = computed(() => getChildrenSlots(slots.default?.()))

const defaultValue = computed(() =>
  props.defaultValue
  || contents.value.find(c => toBoolValue(c.props?.active))?.props?.value,
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
    <div :class="cn(ui.listWrapper(), props.ui?.listWrapper)">
      <TabsList v-bind="listProps" :class="cn(ui.list(), props.ui?.list)">
        <TabsIndicator v-bind="indicatorProps" :class="cn(ui.indicator(), props.ui?.indicator)" />
        <TabsTrigger
          v-for="content in contents"
          v-bind="triggerProps"
          :key="content.props?.value"
          :value="content.props?.value"
          :disabled="content.props?.disabled"
          :class="cn(ui.trigger(), props.ui?.trigger)"
        >
          <Icon
            v-if="content.props?.icon || content.props?.loading"
            :name="toBoolValue(content.props.loading) ? 'loading' : content.props.icon"
            :class="cn(ui.icon({ loading: toBoolValue(content.props.loading) }), props.ui?.icon)"
          />
          <span v-if="content.props?.title" :class="cn(ui.title(), props.ui?.title)">
            {{ content.props?.title }}
          </span>
          <slot name="trigger-after" v-bind="content.props" />
        </TabsTrigger>
      </TabsList>
      <div v-if="$slots.actions" :class="cn(ui.actions(), props.ui?.actions)">
        <slot name="actions" />
      </div>
    </div>
  </DefineTabsList>

  <TabsRoot v-bind="forwarded" :default-value="defaultValue" :orientation="orientation" :class="cn(ui.base(), props.ui?.base, props.class)">
    <ReuseTabsList v-if="side === 'top' || side === 'left'" />
    <template v-for="(content, index) in contents" :key="content.props?.value">
      <component
        :is="content"
        :data-first="index === 0 ? '' : undefined"
        :class="cn(ui.content(), props.ui?.content)"
      />
    </template>
    <ReuseTabsList v-if="side === 'bottom' || side === 'right'" />
  </TabsRoot>
</template>
