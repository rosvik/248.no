/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly COMMIT_HASH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
