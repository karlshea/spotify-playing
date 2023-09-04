interface IAppEnv {
  readonly SPOTIFY_CLIENT_ID: string;
  readonly HA_TOKEN: string;

  readonly SCREEN_TIMEOUT: number;
  readonly SCREEN_URL: string;
  readonly ENABLE_SET_SCREEN_STATE: boolean;

  readonly SPOTIFY_INTERVAL: number;

  readonly HA_URL: string | null | undefined;
  readonly HA_ENTITY: string | null | undefined;

  readonly OCCUPIED_INTERVAL: number;
  readonly ENABLE_OCCUPANCY: boolean;

  readonly PLAYING_USE_BLUR: boolean;
}

const AppEnv: IAppEnv = {
  SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  HA_TOKEN: import.meta.env.VITE_HA_TOKEN,

  SCREEN_TIMEOUT: import.meta.env.VITE_SCREEN_TIMEOUT,
  SCREEN_URL: import.meta.env.VITE_SCREEN_URL,
  ENABLE_SET_SCREEN_STATE: JSON.parse(
    import.meta.env.VITE_ENABLE_SET_SCREEN_STATE
  ),

  SPOTIFY_INTERVAL: import.meta.env.VITE_SPOTIFY_INTERVAL,

  HA_URL: import.meta.env.VITE_HA_URL,
  HA_ENTITY: import.meta.env.VITE_HA_ENTITY,

  OCCUPIED_INTERVAL: import.meta.env.VITE_OCCUPIED_INTERVAL,
  ENABLE_OCCUPANCY: JSON.parse(import.meta.env.VITE_ENABLE_OCCUPANCY),

  PLAYING_USE_BLUR: JSON.parse(import.meta.env.VITE_PLAYING_USE_BLUR),
};

export default AppEnv;
