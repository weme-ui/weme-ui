<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

const { rootNavigation, childNavigation } = useNavigation(navigation!)
</script>

<template>
  <main class="relative">
    <div class="container mx-auto">
      <div class="relative flex gap-x-8 px-6">
        <DocNavigation
          :sections="rootNavigation"
          :navigation="childNavigation"
        />

        <slot />
      </div>
    </div>
  </main>
</template>
