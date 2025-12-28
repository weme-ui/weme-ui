<script lang="ts" setup>
import Comment from '../comment.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="size in sizes" :key="size">
      <Comment
        avatar="https://github.com/antfu.png"
        author="Antfu"
        datetime="1h ago"
        content="What a beautiful day!"
        :size="size"
      >
        <Comment
          avatar="https://github.com/yyx990803.png"
          author="Evan You"
          datetime="just now"
          content="Vue is awesome!"
          :size="size"
          variant="soft"
        />
      </Comment>
    </template>
  </div>
</template>
