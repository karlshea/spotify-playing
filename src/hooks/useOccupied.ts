import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const INTERVAL = import.meta.env.VITE_OCCUPIED_INTERVAL;

const useOccupied = () => {
  const [occupied, setOccupied] = useState(false);

  const updateIsOccupied = useCallback(() => {
    axios
      .get(
        `${import.meta.env.VITE_HA_URL}/api/states/${
          import.meta.env.VITE_HA_ENTITY
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HA_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      .then((response) => {
        setOccupied(response.data.state === 'on');
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const id = setInterval(updateIsOccupied, INTERVAL);
    updateIsOccupied();

    return () => clearInterval(id);
  }, [updateIsOccupied]);

  return occupied;
};

export default useOccupied;
