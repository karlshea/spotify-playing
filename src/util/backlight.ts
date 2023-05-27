import axios from 'axios';

const DISABLE_SET_BACKLIGHT = JSON.parse(
  import.meta.env.VITE_DISABLE_SET_BACKLIGHT
);
const BACKLIGHT_URL = import.meta.env.VITE_BACKLIGHT_URL;

/**
 * Set backlight power.
 */
export const setBacklightPowered = (power: boolean) => {
  if (DISABLE_SET_BACKLIGHT) {
    console.info(`${power ? 'Enabling' : 'Disabling'} backlight (suppressed)`);
    return;
  }

  console.info(`${power ? 'Enabling' : 'Disabling'} backlight`);

  return axios
    .get(BACKLIGHT_URL, {
      params: { power: power ? 'on' : 'off' },
    })
    .catch((error: unknown) => {
      console.log(error);
    });
};
