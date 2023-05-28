import axios from 'axios';

const DISABLE_SET_SCREEN = JSON.parse(import.meta.env.VITE_DISABLE_SET_SCREEN);
const SCREEN_URL = import.meta.env.VITE_SCREEN_URL;

/**
 * Set screen powered.
 */
export const setScreenEnabled = (enable: boolean) => {
  if (DISABLE_SET_SCREEN) {
    console.info(`${enable ? 'Enabling' : 'Disabling'} screen (suppressed)`);
    return;
  }

  console.info(`${enable ? 'Enabling' : 'Disabling'} screen`);

  return axios
    .get(SCREEN_URL, {
      params: { enable: enable ? 'on' : 'off' },
    })
    .catch((error: unknown) => {
      console.log(error);
    });
};
