<script setup lang="ts">
import type { IconifyIcon } from '@iconify/types'
import { computed, ref } from 'vue'
import Icon from './Icon.vue'

export interface WorkflowStep {
  id: string
  label: string
  title: string
  description: string
  status: 'ready' | 'soon'
  prompt: string
  lines: Array<{
    kind: 'ok' | 'muted' | 'code'
    text: string
  }>
}

const props = defineProps<{
  steps: WorkflowStep[]
  checkIcon: IconifyIcon
}>()

const activeId = ref(props.steps[0]?.id ?? '')
const active = computed(() =>
  props.steps.find(step => step.id === activeId.value) ?? props.steps[0],
)
</script>

<template>
  <div class="workflow">
    <div class="workflow-list" role="tablist" aria-label="使用流程">
      <button
        v-for="step in steps"
        :key="step.id"
        type="button"
        role="tab"
        class="workflow-item"
        :class="{ 'is-active': step.id === active?.id }"
        :aria-selected="step.id === active?.id"
        @click="activeId = step.id"
      >
        <div class="workflow-item-head">
          <span class="workflow-item-label">{{ step.label }}</span>
          <span class="workflow-status" :data-status="step.status">
            {{ step.status === 'ready' ? '可用' : '即将推出' }}
          </span>
        </div>
        <strong>{{ step.title }}</strong>
        <p v-show="step.id === active?.id">
          {{ step.description }}
        </p>
      </button>
    </div>

    <div class="workflow-term" role="tabpanel">
      <div class="workflow-term-bar">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
        <span class="workflow-term-title">terminal</span>
      </div>
      <div v-if="active" class="workflow-term-body">
        <p class="term-prompt">
          {{ active.prompt }}
        </p>
        <p
          v-for="(line, index) in active.lines"
          :key="index"
          :class="`term-${line.kind}`"
        >
          <Icon
            v-if="line.kind === 'ok'"
            :icon="checkIcon"
            :width="13"
            :height="13"
          />
          <span>{{ line.text }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workflow {
  display: grid;
  gap: 1px;
  border: 1px solid var(--home-border-strong);
  border-radius: calc(var(--home-radius) + 2px);
  overflow: hidden;
  background: var(--home-border-strong);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.02),
    0 28px 80px rgba(0, 0, 0, 0.45);
}

.workflow-list {
  display: flex;
  flex-direction: column;
  background: var(--home-bg-elevated);
}

.workflow-item {
  appearance: none;
  width: 100%;
  margin: 0;
  padding: 1.05rem 1.15rem;
  border: 0;
  border-bottom: 1px solid var(--home-border);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 140ms ease;
}

.workflow-item:last-child {
  border-bottom: 0;
}

.workflow-item:hover,
.workflow-item.is-active {
  background: color-mix(in srgb, var(--home-accent-soft) 55%, var(--home-bg-elevated));
}

.workflow-item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
}

.workflow-item-label {
  color: var(--home-muted);
  font-family: var(--home-font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.workflow-status {
  padding: 0.12rem 0.4rem;
  border: 1px solid var(--home-border);
  border-radius: 999px;
  color: var(--home-muted);
  font-family: var(--home-font-mono);
  font-size: 0.65rem;
}

.workflow-status[data-status='ready'] {
  border-color: color-mix(in srgb, var(--home-accent) 45%, var(--home-border));
  color: var(--home-accent-ink);
  background: var(--home-accent-soft);
}

.workflow-item strong {
  display: block;
  font-size: 0.98rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.workflow-item p {
  margin: 0.45rem 0 0;
  color: var(--home-ink-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}

.workflow-term {
  background: linear-gradient(180deg, rgba(76, 187, 165, 0.05), transparent 40%), #07080a;
}

.workflow-term-bar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid var(--home-border);
}

.dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: #2e313a;
}

.workflow-term-title {
  margin-left: 0.45rem;
  color: var(--home-muted);
  font-family: var(--home-font-mono);
  font-size: 0.7rem;
}

.workflow-term-body {
  margin: 0;
  padding: 1.15rem 1.1rem 1.35rem;
  min-height: 11.5rem;
  overflow: auto;
  font-family: var(--home-font-mono);
  font-size: 0.8rem;
  line-height: 1.7;
  color: var(--home-ink-soft);
}

.workflow-term-body p {
  margin: 0;
}

.workflow-term-body p + p {
  margin-top: 0.35rem;
}

.term-prompt {
  color: var(--home-ink);
}

.term-ok {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--home-accent-ink);
}

.term-muted {
  color: var(--home-muted);
}

.term-code {
  color: #e8c27a;
}

@media (min-width: 860px) {
  .workflow {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  }

  .workflow-list {
    border-right: 0;
  }

  .workflow-item {
    border-bottom: 1px solid var(--home-border);
  }
}
</style>
