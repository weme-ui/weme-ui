import type { InjectionKey, Ref } from 'vue'
import { computed, inject } from 'vue'

export const portalContextInjectKey: InjectionKey<Ref<boolean | string | HTMLElement>> = Symbol('weme-ui.portal')

export function usePortal(portal: Ref<boolean | string | HTMLElement | undefined>) {
  const globalPortal = inject(portalContextInjectKey, undefined)

  const value = computed(() => portal.value === true ? globalPortal?.value : portal.value)
  const disabled = computed(() => typeof value.value === 'boolean' ? !value.value : false)
  const to = computed(() => typeof value.value === 'boolean' ? 'body' : value.value)

  return computed(() => ({
    disabled: disabled.value,
    to: to.value,
  }))
}
