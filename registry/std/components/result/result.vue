<script lang="ts" setup>
import type { ResultProps } from './result.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import IconBox from '../icon/icon-box.vue'
import { useResultStyle } from './result.style'

const props = withDefaults(defineProps<ResultProps>(), {
  size: 'lg',
})

const delegated = reactivePick(props, 'as', 'asChild')

const resolvedIcon = computed(() => {
  if (props.icon) {
    return props.icon
  }

  else if (props.type) {
    return props.type
  }

  return null
})

const ui = computed(() => useResultStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <slot name="icon">
      <IconBox
        v-if="resolvedIcon"
        :name="resolvedIcon"
        :class="cn(ui.icon(), props.ui?.icon)"
        :color="type"
        :size="size"
        variant="soft"
        radius="full"
      />
    </slot>

    <div class="flex-(~ col center)">
      <slot v-if="$slots.title || title" name="title">
        <h3 :class="cn(ui.title(), props.ui?.title)">
          {{ title }}
        </h3>
      </slot>

      <slot v-if="$slots.description || description" name="description">
        <p :class="cn(ui.description(), props.ui?.description)">
          {{ description }}
        </p>
      </slot>
    </div>

    <div v-if="$slots.action" :class="cn(ui.action(), props.ui?.action)">
      <slot name="action" />
    </div>

    <div v-if="$slots.default" :class="cn(ui.extra(), props.ui?.extra)">
      <slot />
    </div>
  </Primitive>
</template>
