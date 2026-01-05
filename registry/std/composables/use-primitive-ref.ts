import type { ComponentPublicInstance } from 'vue'
import { unrefElement } from '@vueuse/core'
import { computed, ref } from 'vue'

export function usePrimitiveRef<T extends ComponentPublicInstance>() {
  const primitiveRef = ref<T>()
  const currentElement = computed<HTMLElement>(
    () => ['#text', '#comment'].includes(primitiveRef.value?.$el.nodeName)
      ? primitiveRef.value?.$el.nextElementSibling
      : unrefElement(primitiveRef),
  )

  return { primitiveRef, currentElement }
}
