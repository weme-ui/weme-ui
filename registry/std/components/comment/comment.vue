<script lang="ts" setup>
import type { CommentProps } from './comment.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Avatar from '../avatar/avatar.vue'
import Button from '../button/button.vue'
import { useCommentStyle } from './comment.style'

const props = withDefaults(defineProps<CommentProps>(), {
  variant: 'plain',
  align: 'start',
  size: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useCommentStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot name="avatar">
      <Avatar
        v-if="avatar"
        v-bind="typeof avatar === 'string' ? { src: avatar, fallback: avatar.charAt(0) } : avatar"
        :class="cn(ui.avatar(), props.ui?.avatar)"
      />
    </slot>
    <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <div v-if="author || datetime" :class="cn(ui.header(), props.ui?.header)">
        <slot name="author">
          <span v-if="author" :class="cn(ui.author(), props.ui?.author)">
            {{ author }}
          </span>
        </slot>
        <slot name="datetime">
          <span v-if="datetime" :class="cn(ui.datetime(), props.ui?.datetime)">
            {{ datetime }}
          </span>
        </slot>
      </div>
      <div :class="cn(ui.content(), props.ui?.content)">
        {{ content }}
        <slot name="actions" v-bind="{ actions }">
          <div v-if="actions && actions.length" :class="cn(ui.actions(), props.ui?.actions)">
            <Button
              v-for="(action, index) in actions"
              :key="index"
              v-bind="action"
              :variant="action.variant || 'ghost'"
              :size="action.size || size"
            />
          </div>
        </slot>
        <slot />
      </div>
    </div>
  </Primitive>
</template>
