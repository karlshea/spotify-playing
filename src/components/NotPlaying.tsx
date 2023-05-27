import useBacklightTimeout from '../hooks/useBacklightTimeout.ts';
import useClock from '../hooks/useClock.ts';

const NotPlaying = () => {
  const time = useClock();

  useBacklightTimeout();

  // Show clock while waiting for backlight timeout.
  return (
    <div className="not-playing">
      <h1>{time}</h1>
    </div>
  );
};

export default NotPlaying;
