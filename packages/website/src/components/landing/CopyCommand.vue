<script setup lang="ts">
import type { IconifyIcon } from '@iconify/types'
import { ref } from 'vue'
import Icon from './Icon.vue'

const props = defineProps<{
  command: string
  copyIcon: IconifyIcon
  checkIcon: IconifyIcon
}>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 1600)
  }
  catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="copy-command">
    <code class="copy-command-text">{{ command }}</code>
    <button
      type="button"
      class="copy-command-btn"
      :aria-label="copied ? '已复制' : '复制命令'"
      @click="copy"
    >
      <Icon :icon="copied ? checkIcon : copyIcon" :width="16" :height="16" />
    </button>
  </div>
</template>

<style scoped>
.copy-command {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: min(100%, 22rem);
  padding: 0.7rem 0.75rem 0.7rem 1rem;
  border: 1px solid var(--home-border-strong);
  border-radius: 0.55rem;
  background: color-mix(in srgb, var(--home-bg-elevated) 88%, #000);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.copy-command-text {
  flex: 1;
  font-family: var(--home-font-mono);
  font-size: 0.875rem;
  color: var(--home-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-command-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  appearance: none;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  background: transparent;
  color: var(--home-muted);
  cursor: pointer;
  transition:
    color 140ms ease,
    background 140ms ease,
    border-color 140ms ease;
}

.copy-command-btn:hover {
  color: var(--home-ink);
  background: var(--home-bg-soft);
  border-color: var(--home-border);
}

.copy-command-btn:focus-visible {
  outline: 2px solid var(--home-accent);
  outline-offset: 2px;
}
</style>
