<script lang="ts" setup>
definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(
  `content-${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found!' })
}

const title = page.value?.seo?.title ? page.value.seo.title : page.value?.navigation?.title ? page.value.navigation.title : page.value?.title
const description = page.value?.seo?.description ? page.value.seo.description : page.value?.description

useSeoMeta({
  title,
  description,
})

const config = useRuntimeConfig().public

const communityLinks = computed(() => [{
  icon: 'i-lucide-file-pen',
  label: 'Edit this page',
  to: `https://github.com/weme-ui/weme-ui/edit/main/docs/content/${page?.value?.stem}.md`,
  target: '_blank',
}, {
  icon: 'i-lucide-star',
  label: 'Star on GitHub',
  to: `https://github.com/weme-ui/weme-ui`,
  target: '_blank',
}])
</script>

<template>
  <div v-if="page" class="flex-1 px-6">
    <header class="flex-(~ col) pt-10 gap-y-10">
      <div class="flex-(~ col) gap-y-2">
        <h1 class="text-4xl font-bold c-highlighted">
          {{ page.title }}
        </h1>

        <MDC v-if="page.description" :value="page.description" class="text-3.5 c-toned" unwrap="p" tag="p" />
      </div>

      <ul v-if="page.links && page.links.length" class="flex-(~ y-center) gap-x-2">
        <li v-for="link in page.links" :key="link.to">
          <UiBadge :text="link.label === '$version' ? config.version : link.label" :icon="link.icon" :href="link.to" :target="link.target" :rel="link.rel" />
        </li>
      </ul>

      <UiSeparator variant="dotted" />
    </header>

    <ContentRenderer v-if="page.body" :value="page" :data="config" class="pb-8" />
  </div>

  <aside class="sticky top-16.5 w-50 py-8 shrink-0 h-[calc(100vh-8rem-1px)]">
    <DocOutline :items="page?.body?.toc?.links || []" />

    <UiSeparator variant="dotted" />

    <ul class="mt-5 text-3.5 space-y-2">
      <li v-for="link in communityLinks" :key="link.to">
        <UiLink :to="link.to" :target="link.target" color="neutral">
          <ProseIcon :name="link.icon" />
          {{ link.label }}
        </UiLink>
      </li>
    </ul>
  </aside>
</template>
