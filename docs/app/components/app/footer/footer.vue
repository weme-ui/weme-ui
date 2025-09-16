<script lang="ts" setup>
import { useFooterStyle } from './footer.style'

const footer = useConfig('footer')

const ui = computed(() => useFooterStyle())
</script>

<template>
  <footer :class="ui.base()">
    <p v-if="footer?.copyright" :class="ui.copyright()">
      {{ footer?.copyright }}
    </p>

    <ul :class="ui.links()">
      <li v-for="link in footer?.links" :key="link.to" :class="ui.linkItem()">
        <NuxtLink :to="link.to" :target="link.target" :rel="link.rel" :class="ui.link()">
          {{ link.label }}
          <AppIcon v-if="link.rel === 'noopener noreferrer'" name="external" :class="ui.linkExternalIcon()" />
        </NuxtLink>
      </li>
    </ul>
  </footer>
</template>
