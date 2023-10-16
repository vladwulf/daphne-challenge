/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRID_X_MAX: string;
  readonly VITE_GRID_Y_MAX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
