<script lang="ts" setup>
import type { TabsContentProps } from './tabs-content.props'
import { reactivePick } from '@vueuse/core'
import { TabsContent, useForwardProps } from 'reka-ui'

const props = defineProps<TabsContentProps>()
const delegated = useForwardProps(reactivePick(props, 'as', 'asChild', 'value', 'forceMount'))
</script>

<template>
  <TabsContent v-bind="delegated" data-slot="tabs-content" :class="props.class">
    <slot />
  </TabsContent>
</template>
