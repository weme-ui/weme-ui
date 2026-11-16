import type { UserExtendUnoConfig } from '@weme-ui/utilities'
import { Theme } from '../../../../packages/unocss-preset/src'

export default <UserExtendUnoConfig<Theme>>{
  shortcuts: [
    {
      'z-hint': 'z-900',
    },
  ],

  animations: {
    keyframes: {
      'fade-test-in': '0% { opacity: 0; } 100% { opacity: 1; }',
      'fade-test-out': '0% { opacity: 1; } 100% { opacity: 0; }',
    },
    durations: {
      'fade-test-in': '0.3s',
      'fade-test-out': '0.3s',
    },
  },
}
