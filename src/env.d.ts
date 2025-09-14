interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // можна додавати інші змінні, які є у .env
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
