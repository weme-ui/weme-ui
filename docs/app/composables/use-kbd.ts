import { createSharedComposable } from '@vueuse/core'
import { computed, onMounted, reactive } from 'vue'

interface KbdKeysSpecificMap {
  meta: string
  alt: string
  ctrl: string
}

export const kbdKeysMap = {
  meta: '',
  ctrl: '',
  alt: '',
  win: '⊞',
  command: '⌘',
  shift: '⇧',
  control: '⌃',
  option: '⌥',
  enter: '↵',
  delete: '⌦',
  backspace: '⌫',
  escape: '⎋',
  tab: '⇥',
  capsLock: '⇪',
  arrowUp: '↑',
  arrowRight: '→',
  arrowDown: '↓',
  arrowLeft: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘',
}

export type KbdKey = keyof typeof kbdKeysMap
export type KbdKeySpecific = keyof KbdKeysSpecificMap

function _useKbd() {
  const macOS = computed(() =>
    import.meta.client
      && navigator
      && navigator.userAgent
      && navigator.userAgent.match(/Macintosh;/),
  )

  const specificMap = reactive({
    meta: ' ',
    alt: ' ',
    ctrl: ' ',
  })

  onMounted(() => {
    specificMap.meta = macOS.value ? kbdKeysMap.command : 'Ctrl'
    specificMap.ctrl = macOS.value ? kbdKeysMap.control : 'Ctrl'
    specificMap.alt = macOS.value ? kbdKeysMap.option : 'Alt'
  })

  function getKbdKey(value?: KbdKey | string) {
    if (!value) {
      return
    }

    if (['meta', 'alt', 'ctrl'].includes(value)) {
      return specificMap[value as KbdKeySpecific]
    }

    return kbdKeysMap[value as KbdKey] || value.toUpperCase()
  }

  return {
    macOS,
    getKbdKey,
  }
}

export const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd)
