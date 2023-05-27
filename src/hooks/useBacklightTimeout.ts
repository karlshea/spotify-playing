import { useEffect } from 'react';

import { setBacklightPowered } from '../util/backlight.ts';

const BACKLIGHT_TIMEOUT = import.meta.env.VITE_BACKLIGHT_TIMEOUT;

const useBacklightTimeout = () => {
  // Disable backlight after the timeout, and re-enable it on unmount.
  useEffect(() => {
    const timerId = setTimeout(
      () => setBacklightPowered(false),
      BACKLIGHT_TIMEOUT
    );

    return () => {
      clearTimeout(timerId);
      setBacklightPowered(true);
    };
  }, []);
};

export default useBacklightTimeout;
