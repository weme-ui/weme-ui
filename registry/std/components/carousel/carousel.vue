<script lang="ts" setup generic="T extends CarouselItem">
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
import type { CarouselEmits, CarouselItem, CarouselProps, CarouselValue } from './carousel.props'
import { reactivePick } from '@vueuse/core'
import useEmblaCarousel from 'embla-carousel-vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import IconButton from '../icon-button/icon-button.vue'
import { useCarouselStyle } from './carousel.style'

const props = withDefaults(defineProps<CarouselProps<T>>(), {
  orientation: 'horizontal',
  showArrows: false,
  showDots: false,
  prevIcon: 'left',
  nextIcon: 'right',
  // Embla Options
  active: true,
  align: 'center',
  breakpoints: () => ({}),
  containScroll: 'trimSnaps',
  dragFree: false,
  dragThreshold: 10,
  duration: 25,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  slidesToScroll: 1,
  startIndex: 0,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true,
  // Embla Plugins
  autoplay: false,
  fade: false,
  wheelGestures: false,
})

const emits = defineEmits<CarouselEmits>()
const emblaProps = useForwardProps(reactivePick(props, 'active', 'align', 'breakpoints', 'containScroll', 'dragFree', 'dragThreshold', 'duration', 'inViewThreshold', 'loop', 'skipSnaps', 'slidesToScroll', 'startIndex', 'watchDrag', 'watchResize', 'watchSlides', 'watchFocus'))
const { dir, t } = useLocale()

const stopAutoplayOnInteraction = computed(() => {
  if (typeof props.autoplay === 'boolean') {
    return true
  }
  return props.autoplay.stopOnInteraction ?? true
})

const ui = computed(() => useCarouselStyle({
  orientation: props.orientation,
  autoHide: !!props.autoplay,
}))

const options = computed<EmblaOptionsType>(() => ({
  ...(props.fade ? { align: 'center', containScroll: false } : {}),
  ...emblaProps.value,
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
  direction: dir.value === 'rtl' ? 'rtl' : 'ltr',
}))

const plugins = ref<EmblaPluginType[]>([])

async function loadPlugins() {
  const emblaPlugins: EmblaPluginType[] = []

  if (props.autoplay) {
    const AutoplayPlugin = await import('embla-carousel-autoplay').then(r => r.default)
    emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === 'boolean' ? {} : props.autoplay))
  }

  if (props.fade) {
    const FadePlugin = await import('embla-carousel-fade').then(r => r.default)
    emblaPlugins.push(FadePlugin(typeof props.fade === 'boolean' ? {} : props.fade))
  }

  if (props.wheelGestures) {
    const WheelGesturesPlugin = await import('embla-carousel-wheel-gestures').then(r => r.default)
    emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === 'boolean' ? {} : props.wheelGestures))
  }

  plugins.value = emblaPlugins
}

const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

watch(
  () => [props.autoplay, props.fade, props.wheelGestures],
  async () => {
    await loadPlugins()
    emblaApi.value?.reInit(options.value, plugins.value)
  },
  { immediate: true },
)

watch(options, () => {
  emblaApi.value?.reInit(options.value, plugins.value)
}, { flush: 'post' })

function stopOnInteraction() {
  if (stopAutoplayOnInteraction.value) {
    emblaApi.value?.plugins().autoplay?.stop()
  }
}

function scrollPrev() {
  emblaApi.value?.scrollPrev()
  stopOnInteraction()
}

function scrollNext() {
  emblaApi.value?.scrollNext()
  stopOnInteraction()
}

function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index)
}

function onKeyDown(event: KeyboardEvent) {
  let prevKey
  let nextKey
  if (props.orientation === 'horizontal') {
    prevKey = dir.value === 'ltr' ? 'ArrowLeft' : 'ArrowRight'
    nextKey = dir.value === 'ltr' ? 'ArrowRight' : 'ArrowLeft'
  }
  else {
    prevKey = 'ArrowUp'
    nextKey = 'ArrowDown'
  }

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()

    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}

const canScrollNext = ref(false)
const canScrollPrev = ref(false)
const selectedIndex = ref<number>(0)
const scrollSnaps = ref<number[]>([])

function onInit(api: EmblaCarouselType) {
  scrollSnaps.value = api?.scrollSnapList() || []
}

function onSelect(api: EmblaCarouselType) {
  canScrollNext.value = api?.canScrollNext() || false
  canScrollPrev.value = api?.canScrollPrev() || false
  selectedIndex.value = api?.selectedScrollSnap() || 0

  emits('select', selectedIndex.value)
}

function isCarouselItem(item: CarouselItem): item is Exclude<CarouselItem, CarouselValue> {
  return typeof item === 'object' && item !== null
}

onMounted(() => {
  if (!emblaApi.value)
    return

  emblaApi.value.on('init', onInit)
  emblaApi.value.on('init', onSelect)
  emblaApi.value.on('reInit', onInit)
  emblaApi.value.on('reInit', onSelect)
  emblaApi.value.on('select', onSelect)
})

onBeforeUnmount(() => {
  if (!emblaApi.value)
    return

  emblaApi.value.off('init', onInit)
  emblaApi.value.off('init', onSelect)
  emblaApi.value.off('reInit', onInit)
  emblaApi.value.off('reInit', onSelect)
  emblaApi.value.off('select', onSelect)
})

defineExpose({
  emblaRef,
  emblaApi,
})
</script>

<template>
  <Primitive
    :as="as"
    data-slot="carousel"
    role="region"
    :data-orientation="orientation"
    aria-roledescription="carousel"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <div ref="emblaRef" data-slot="carousel-viewport" :class="cn(ui.viewport(), props.ui?.viewport)">
      <div data-slot="carousel-container" :class="cn(ui.container(), props.ui?.container)">
        <div
          v-for="(item, index) in items"
          v-bind="!!dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }"
          :key="index"
          data-slot="carousel-item"
          :class="cn(ui.item(), props.ui?.item, isCarouselItem(item) && item.class)"
        >
          <slot :item="item" :index="index" />
        </div>
      </div>
    </div>
    <div v-if="!!arrows || !!dots" data-slot="carousel-controls" :class="cn(ui.controls(), props.ui?.controls)">
      <div v-if="!!arrows" data-slot="carousel-arrows" :class="cn(ui.arrows(), props.ui?.arrows)">
        <IconButton
          v-bind="typeof prev === 'object' ? prev : undefined"
          data-slot="carousel-prev"
          :disabled="!canScrollPrev"
          :icon="prevIcon"
          :aria-label="t('carousel.prev')"
          :variant="prev?.variant || 'surface'"
          :size="next?.size || 'sm'"
          :class="cn(ui.prev(), props.ui?.prev)"
          @click="scrollPrev"
        />
        <IconButton
          v-bind="typeof next === 'object' ? next : undefined"
          data-slot="carousel-next"
          :disabled="!canScrollNext"
          :icon="nextIcon"
          :aria-label="t('carousel.next')"
          :variant="next?.variant || 'surface'"
          :size="next?.size || 'sm'"
          :class="cn(ui.next(), props.ui?.next)"
          @click="scrollNext"
        />
      </div>
      <div v-if="!!dots" role="tablist" data-slot="carousel-dots" :aria-label="t('carousel.dots')" :class="cn(ui.dots(), props.ui?.dots)">
        <button
          v-for="(_, index) in scrollSnaps"
          :key="index"
          data-slot="carousel-dot"
          :aria-label="t('carousel.goto', { slide: index + 1 })"
          :aria-selected="index === selectedIndex"
          :data-state="index === selectedIndex ? 'active' : undefined"
          :class="cn(ui.dot({ active: index === selectedIndex }), props.ui?.dot)"
          role="tab"
          @click="scrollTo(index)"
        />
      </div>
    </div>
  </Primitive>
</template>
