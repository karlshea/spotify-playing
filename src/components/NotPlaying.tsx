import { useEffect, useState } from 'react';

const NotPlaying = () => {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => setDate(new Date());

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="not-playing">
      <h1>{date.toLocaleTimeString([], { timeStyle: 'short' })}</h1>
    </div>
  );
};

export default NotPlaying;
