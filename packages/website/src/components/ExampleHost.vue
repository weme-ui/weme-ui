<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const props = defineProps<{
  examplePath: string
}>()

const exampleModules = import.meta.glob<{ default: any }>(
  '../../../../registry/*/src/**/examples/*.vue',
  { eager: true },
)

const Example = computed(() => {
  const key = Object.keys(exampleModules).find(path =>
    path.endsWith(`/registry/${props.examplePath}`)
    || path.endsWith(props.examplePath)
    || path.includes(props.examplePath),
  )
  return key ? exampleModules[key]?.default : null
})

const app = getCurrentInstance()?.appContext.app
if (app && !app.config.globalProperties.$router) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/:pathMatch(.*)*', component: { render: () => null } },
    ],
  })
  app.use(router)
}
</script>

<template>
  <component :is="Example" v-if="Example" />
  <p v-else class="text-sm text-neutral-11">
    Example not found: {{ examplePath }}
  </p>
</template>
