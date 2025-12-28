<script lang="ts" setup>
import Comment from '../comment.vue'

const aligns = ['start', 'end'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-4">
    <template v-for="align in aligns" :key="align">
      <Comment
        avatar="https://github.com/antfu.png"
        author="Antfu"
        datetime="1h ago"
        content="What a beautiful day!"
        :align="align"
      >
        <Comment
          avatar="https://github.com/yyx990803.png"
          author="Evan You"
          datetime="just now"
          content="Vue is awesome!"
          :align="align"
          variant="soft"
        />
      </Comment>
    </template>
  </div>
</template>
