<script lang="ts" setup>
import { useHeaderLinksStyle } from './header-links.style'

const { github } = defineProps<{
  links?: DocsLink[]
  github?: {
    repo: string
    branch?: string
    directory?: string
  }
}>()

const repository = computed(() => {
  let href = `https://github.com/${github?.repo}`

  if (github?.branch)
    href += `/tree/${github?.branch}`

  if (github?.directory) {
    if (!github?.branch)
      href += '/tree/main'

    href += `/${github?.directory}`
  }

  return href
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

const ui = useHeaderLinksStyle()
</script>

<template>
  <ul :class="ui.base()">
    <li v-for="link in links" :key="link.to">
      <NuxtLink v-if="link.icon" :to="link.to" :target="link.target" :rel="link.rel" :class="ui.link()">
        <AppIcon :name="link.icon" class="size-5" />
      </NuxtLink>
    </li>

    <li>
      <AppIcon
        :name="isDark ? 'lucide:sun' : 'lucide:moon'"
        class="size-5 cursor-pointer c-highlighted"
        @click="toggleDark()"
      />
    </li>

    <li v-if="github">
      <NuxtLink :to="repository" target="_blank" rel="noopener noreferrer" :class="ui.link()">
        <AppIcon name="simple-icons:github" class="size-5" />
      </NuxtLink>
    </li>
  </ul>
</template>
