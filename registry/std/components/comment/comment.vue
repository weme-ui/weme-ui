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
  radius: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useCommentStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" data-slot="comment" :class="cn(ui.root(), props.ui?.root, props.class)">
    <slot name="avatar">
      <Avatar
        v-if="avatar"
        v-bind="typeof avatar === 'string' ? { src: avatar, fallback: author?.charAt(0) } : avatar"
        :class="cn(ui.avatar(), props.ui?.avatar)"
      />
    </slot>
    <div data-slot="comment-wrapper" :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <div v-if="author || datetime" data-slot="comment-header" :class="cn(ui.header(), props.ui?.header)">
        <slot name="author">
          <span v-if="author" data-slot="comment-author" :class="cn(ui.author(), props.ui?.author)">
            {{ author }}
          </span>
        </slot>
        <slot name="datetime">
          <span v-if="datetime" data-slot="comment-datetime" :class="cn(ui.datetime(), props.ui?.datetime)">
            {{ datetime }}
          </span>
        </slot>
      </div>
      <div data-slot="comment-content" :class="cn(ui.content(), props.ui?.content)">
        {{ content }}
        <slot name="actions" v-bind="{ actions }">
          <div v-if="actions && actions.length" data-slot="comment-actions" :class="cn(ui.actions(), props.ui?.actions)">
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
