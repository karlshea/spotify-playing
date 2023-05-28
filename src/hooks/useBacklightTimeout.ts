import { useEffect } from 'react';

import { setBacklightPowered } from '../util/backlight.ts';

const BACKLIGHT_TIMEOUT = import.meta.env.VITE_BACKLIGHT_TIMEOUT;

const useBacklightTimeout = (enable: boolean) => {
  // Disable backlight after the timeout, and re-enable it on unmount.
  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (enable) {
      timerId = setTimeout(() => setBacklightPowered(false), BACKLIGHT_TIMEOUT);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        setBacklightPowered(true);
      }
    };
  }, [enable]);
};

export default useBacklightTimeout;
