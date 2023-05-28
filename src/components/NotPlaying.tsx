import useClock from '../hooks/useClock.ts';

const NotPlaying = () => {
  const time = useClock();

  // Show clock while waiting for screen timeout.
  return (
    <div className="not-playing">
      <h1>{time}</h1>
    </div>
  );
};

export default NotPlaying;
