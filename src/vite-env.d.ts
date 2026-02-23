/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
