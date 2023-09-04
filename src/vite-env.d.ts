/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_HA_TOKEN: string;

  readonly VITE_SCREEN_TIMEOUT: number;
  readonly VITE_SCREEN_URL: string;
  readonly VITE_ENABLE_SET_SCREEN_STATE: string;

  readonly VITE_SPOTIFY_INTERVAL: number;

  readonly VITE_HA_URL: string | null | undefined;
  readonly VITE_HA_ENTITY: string | null | undefined;

  readonly VITE_OCCUPIED_INTERVAL: number;
  readonly VITE_ENABLE_OCCUPANCY: string;

  readonly VITE_PLAYING_USE_BLUR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
