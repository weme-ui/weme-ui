<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { homeIcons } from '../lib/icons'
import Icon from './landing/Icon.vue'

const STORAGE_KEY = 'weme-docs-theme'

const isDark = ref(true)

function applyTheme(dark: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.classList.toggle('light', !dark)
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  isDark.value = dark
}

function toggleTheme() {
  applyTheme(!isDark.value)
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const icon = computed(() => (isDark.value ? homeIcons.sunLine : homeIcons.moonLine))
const label = computed(() => (isDark.value ? '切换到亮色模式' : '切换到暗色模式'))
</script>

<template>
  <button
    type="button"
    class="docs-theme-toggle"
    :aria-label="label"
    :title="label"
    @click="toggleTheme"
  >
    <Icon :icon="icon" :width="18" :height="18" />
  </button>
</template>
