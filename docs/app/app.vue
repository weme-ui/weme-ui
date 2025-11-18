<script setup lang="ts">
const { data: navigation } = await useAsyncData(
  'navigation',
  () => queryCollectionNavigation('docs', ['icon', 'registry', 'links', 'description']),
)

provide('navigation', navigation)
</script>

<template>
  <UiApp>
    <NuxtLoadingIndicator color="var(--accent)" />
    <div class="flex-(~ col) min-h-screen h-full">
      <AppHeader />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <AppFooter />
    </div>
  </UiApp>
</template>
