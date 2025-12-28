<script lang="ts" setup>
import Comment from '../comment.vue'
</script>

<template>
  <Comment
    avatar="https://github.com/antfu.png"
    author="Antfu"
    datetime="1h ago"
    content="What a beautiful day!"
    :actions="[
      { label: 'RT', size: 'sm', variant: 'soft' },
      { icon: 'lucide:star', size: 'sm', variant: 'soft' },
    ]"
  >
    <Comment
      avatar="https://github.com/yyx990803.png"
      author="Evan You"
      datetime="just now"
      content="Vue is awesome!"
      variant="soft"
      :actions="[
        { label: 'Reply', size: 'sm', variant: 'inverse' },
        { icon: 'lucide:thumbs-up', size: 'sm', variant: 'inverse' },
      ]"
    />
  </Comment>
</template>
