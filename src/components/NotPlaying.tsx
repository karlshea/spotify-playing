import { useEffect, useState } from 'react';
import axios from 'axios';

const ONE_SECOND = 1000;

const BACKLIGHT_TIMEOUT = import.meta.env.VITE_BACKLIGHT_TIMEOUT;
const DISABLE_SET_BACKLIGHT = JSON.parse(
  import.meta.env.VITE_DISABLE_SET_BACKLIGHT
);
const BACKLIGHT_URL = import.meta.env.VITE_BACKLIGHT_URL;

const NotPlaying = () => {
  const [date, setDate] = useState(new Date());

  // Show clock while waiting for timeout.
  useEffect(() => {
    const refreshClock = () => setDate(new Date());

    const timerId = setInterval(refreshClock, ONE_SECOND);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Set backlight power.
  const setBacklightPowered = (power: boolean) => {
    if (DISABLE_SET_BACKLIGHT) {
      console.info(
        `${power ? 'Enabling' : 'Disabling'} backlight (suppressed)`
      );
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

  // Disable backlight after the timeout, and re-enable it on component unmount.
  useEffect(() => {
    const disableBacklight = () => {
      setBacklightPowered(false);
    };
    const enableBacklight = () => {
      setBacklightPowered(true);
    };

    const timerId = setTimeout(disableBacklight, BACKLIGHT_TIMEOUT);

    return () => {
      clearTimeout(timerId);
      enableBacklight();
    };
  }, []);

  return (
    <div className="not-playing">
      <h1>{date.toLocaleTimeString([], { timeStyle: 'short' })}</h1>
    </div>
  );
};

export default NotPlaying;
