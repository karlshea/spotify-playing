import { useEffect, useState } from 'react';

const ONE_SECOND = 1000;

const useClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), ONE_SECOND);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return date.toLocaleTimeString([], { timeStyle: 'short' });
};

export default useClock;
