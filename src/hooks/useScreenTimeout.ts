import { useEffect } from 'react';

import { setScreenEnabled } from '../util/screen.ts';

const SCREEN_TIMEOUT = import.meta.env.VITE_SCREEN_TIMEOUT;

const useScreenTimeout = (enable: boolean) => {
  // Turn off screen after the timeout, and re-enable it on unmount.
  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (enable) {
      timerId = setTimeout(() => setScreenEnabled(false), SCREEN_TIMEOUT);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        setScreenEnabled(true);
      }
    };
  }, [enable]);
};

export default useScreenTimeout;
