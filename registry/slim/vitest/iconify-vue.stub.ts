import { defineComponent, h } from 'vue'

/** Test-only stub: no Iconify API fetch (avoids happy-dom AbortError on teardown). */
export const Icon = defineComponent({
  name: 'Icon',
  inheritAttrs: true,
  props: {
    icon: {
      type: [String, Object],
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h('svg', {
        ...attrs,
        'xmlns': 'http://www.w3.org/2000/svg',
        'data-icon': typeof props.icon === 'string' ? props.icon : undefined,
      })
  },
})
