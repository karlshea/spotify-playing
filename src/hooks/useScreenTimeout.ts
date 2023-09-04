import { useEffect } from 'react';
import axios from 'axios';

import AppEnv from '../AppEnv.ts';

const setScreenState = (enable: boolean) => {
  if (!AppEnv.ENABLE_SET_SCREEN_STATE) {
    console.info(
      `Screen set state disabled (${enable ? 'Enabling' : 'Disabling'} screen)`
    );
    return;
  }

  console.info(`${enable ? 'Enabling' : 'Disabling'} screen`);

  return axios
    .get(AppEnv.SCREEN_URL, {
      params: { enable: enable ? 'on' : 'off' },
    })
    .catch((error: unknown) => {
      console.error(error);
    });
};

const useScreenTimeout = (enable: boolean) => {
  // Turn off screen after the timeout, and re-enable it on unmount.
  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (enable) {
      timerId = setTimeout(() => setScreenState(false), AppEnv.SCREEN_TIMEOUT);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        setScreenState(true);
      }
    };
  }, [enable]);
};

export default useScreenTimeout;
