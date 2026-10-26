declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare global {
  interface ImportMetaEnv {
    VITE_APP_URL: string
    VITE_APP_PORT: number
  }
}
