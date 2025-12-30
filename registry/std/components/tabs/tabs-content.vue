<script lang="ts" setup>
import type { TabsContentProps } from './tabs-content.props'
import { reactivePick } from '@vueuse/core'
import { TabsContent, useForwardProps } from 'reka-ui'

const props = defineProps<TabsContentProps>()
const delegated = useForwardProps(reactivePick(props, 'as', 'asChild', 'value', 'forceMount'))
</script>

<template>
  <TabsContent v-bind="delegated" :class="props.class" data-slot="tabs-content">
    <slot />
  </TabsContent>
</template>
