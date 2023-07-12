/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly COMMIT_HASH: string;
  readonly CF_PAGES_COMMIT_SHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
