<script lang="ts" setup>
import type { AnchorEmits, AnchorProps } from './anchor.props'
import { useThrottleFn } from '@vueuse/core'
import { computed, nextTick, onMounted, reactive, ref, shallowRef, useTemplateRef } from 'vue'
import { cn } from '~/utils/styles'
import { useAnchorStyle } from './anchor.style'

const props = withDefaults(defineProps<AnchorProps>(), { smooth: true })
const emits = defineEmits<AnchorEmits>()

const ui = computed(() => useAnchorStyle(props))

const containerRef = shallowRef<HTMLElement | Window>()
const rootRef = useTemplateRef<HTMLElement>('rootRef')

const currentLink = ref('')
const isScrolling = ref(false)
const linkNodes = reactive<Record<string, HTMLElement>>({})

const indicatorTop = ref(0)

const throttledScroll = useThrottleFn(() => {
  if (isScrolling.value)
    return

  const element = getFirstInViewElement()

  if (element && element.id) {
    onAnchorChange(`#${element.id}`)
  }
}, 100)

function getFirstInViewElement(): HTMLElement | undefined {
  if (!containerRef.value)
    return undefined

  const containerRect = containerRef.value instanceof Window
    ? containerRef.value.document.documentElement.getBoundingClientRect()
    : containerRef.value.getBoundingClientRect()

  for (const hash of Object.keys(linkNodes)) {
    const element = linkNodes[hash]

    if (element) {
      const { top } = element.getBoundingClientRect()
      const offsetTop = containerRef.value instanceof Window
        ? top
        : top - containerRect.top

      if (offsetTop > 0 && offsetTop < containerRect.height / 2) {
        return element
      }
    }
  }

  return undefined
}

function onAnchorChange(hash: string) {
  if (!linkNodes[hash] && rootRef.value) {
    const element = rootRef.value.querySelector<HTMLElement>(`a[href="${hash}"]`)
    if (!element)
      return

    linkNodes[hash] = element
  }

  if (hash !== currentLink.value) {
    currentLink.value = hash

    nextTick(() => {
      emits('change', hash)
    })
  }
}

watch(currentLink, () => {
  const link = linkNodes[currentLink.value]

  if (link) {
    indicatorTop.value = link.offsetTop
  }
})

onMounted(() => {
  if (!import.meta.client) {
    return
  }

  watch(() => props.links, () => {
    props.links?.forEach((link) => {
      if (!linkNodes[link.href] && rootRef.value) {
        const element = rootRef.value.querySelector<HTMLElement>(`a[href="${link.href}"]`)
        if (element) {
          linkNodes[link.href] = element
        }
      }
    })
  }, { immediate: true })

  watchEffect((onInvalidate) => {
    const element
      = (props.container
        && props.container !== window
        && document.querySelector(props.container as string) as HTMLElement)
      || window

    containerRef.value = element

    if (element) {
      element.addEventListener('scroll', throttledScroll)
      element.addEventListener('resize', throttledScroll)

      onInvalidate(() => {
        element.removeEventListener('scroll', throttledScroll)
        element.removeEventListener('resize', throttledScroll)
      })
    }

    const hash = decodeURIComponent(window.location.hash)
    if (hash) {
      //
    }
    else {
      throttledScroll()
    }
  })
})
</script>

<template>
  <div
    ref="rootRef"
    data-slot="anchor"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div
      data-slot="anchor-indicator"
      :class="cn(ui.indicator(), props.ui?.indicator)"
      :style="{
        '--anchor-indicator-top': indicatorTop ? `${indicatorTop}px` : undefined,
      }"
    />
    <ul data-slot="anchor-list" :class="cn(ui.list(), props.ui?.list)">
      <li
        v-for="link in links"
        :key="link.href"
        data-slot="anchor-item"
        :class="cn(ui.item(), props.ui?.item)"
        :data-active="link.href === currentLink ? '' : undefined"
      >
        <slot name="link" v-bind="{ link, isActive: link.href === currentLink }">
          <a data-slot="anchor-link" :href="link.href" :class="cn(ui.link(), props.ui?.link)" :title="link.label">
            {{ link.label }}
          </a>
        </slot>
      </li>
    </ul>
  </div>
</template>
