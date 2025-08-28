<script lang="ts" setup>
import { useHeaderStyle } from './header.style'

const config = useConfig()
const { page } = useContent()

const repoUrl = computed(() => {
  let href = `https://github.com/${config.value.github?.repo}`

  if (config.value.github?.branch)
    href += `/tree/${config.value.github?.branch}`

  if (config.value.github?.directory) {
    if (!config.value.github?.branch)
      href += '/tree/main'

    href += `/${config.value.github?.directory}`
  }

  return href
})

const ui = computed(() => useHeaderStyle({
  bordered: !!page.value?.header.bordered,
}))
</script>

<template>
  <header :class="ui.base()">
    <div :class="ui.container()">
      <NuxtLink to="/" :title="config.header?.name">
        <h1 :class="ui.logo()">
          <AppHeaderLogo :logo="config.header?.logo" />
          <strong v-if="config.header?.name" :class="ui.logoText()">
            {{ config.header?.name }}
          </strong>
        </h1>
      </NuxtLink>

      <AppHeaderNav :nav="config.header?.nav" class="flex-1" />

      <ul :class="ui.socials()">
        <li v-for="social in config.socials" :key="social.to">
          <NuxtLink :to="social.to" :target="social.target" :rel="social.rel" :class="ui.socialLink()">
            <AppIcon :name="social.icon" class="size-5" />
          </NuxtLink>
        </li>

        <li v-if="config.github">
          <NuxtLink
            :to="repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            :class="ui.socialLink()"
          >
            <AppIcon name="simple-icons:github" class="size-5" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
