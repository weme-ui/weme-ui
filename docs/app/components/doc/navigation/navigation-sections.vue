<script lang="ts" setup>
import { useNavigationSectionsStyle } from './navigation-sections.style'

interface SectionNavigation {
  title: string
  icon?: string
  path: string
  badge?: string
}

defineProps<{
  sections: SectionNavigation[]
}>()

const route = useRoute()
const ui = useNavigationSectionsStyle()

function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <ul :class="ui.base()">
    <li v-for="section in sections" :key="section.path">
      <NuxtLink :to="section.path" :class="ui.link({ active: isActive(section.path) })">
        <div v-if="section.icon" :class="ui.icon({ active: isActive(section.path) })">
          <ProseIcon :name="section.icon" />
        </div>

        <span :class="ui.title()">
          {{ section.title }}
        </span>

        <UiBadge
          v-if="section.badge"
          :text="section.badge"
          :color="isActive(section.path) ? 'accent' : 'neutral'"
          variant="outline"
        />
      </NuxtLink>
    </li>
  </ul>
</template>
