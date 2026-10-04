<script lang="ts" setup>
import Icon from '../icon.vue'

const icons = [
  'ri:anthropic-line',
  'ri:wechat-2-line',
  'ri:instagram-line',
  'ri:facebook-line',
  'ri:twitter-line',
  'ri:linkedin-line',
  'ri:youtube-line',
  'ri:tiktok-line',
  'ri:twitch-line',
  'ri:discord-line',
]
</script>

<template>
  <div class="flex flex-wrap gap-4 items-center justify-center">
    <Icon v-for="icon in icons" :key="icon" :name="icon" />
  </div>
</template>
