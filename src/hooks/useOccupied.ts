import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const INTERVAL = import.meta.env.VITE_OCCUPIED_INTERVAL;
const HA_URL = import.meta.env.VITE_HA_URL;
const HA_ENTITY = import.meta.env.VITE_HA_ENTITY;
const HA_TOKEN = import.meta.env.VITE_HA_TOKEN;
const ENABLE_OCCUPANCY = JSON.parse(import.meta.env.VITE_ENABLE_OCCUPANCY);

const useOccupied = () => {
  const [occupied, setOccupied] = useState(ENABLE_OCCUPANCY);

  const updateIsOccupied = useCallback(() => {
    axios
      .get(`${HA_URL}/api/states/${HA_ENTITY}`, {
        headers: {
          Authorization: `Bearer ${HA_TOKEN}`,
        },
      })
      .then((response) => {
        setOccupied(response.data.state === 'on');
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!ENABLE_OCCUPANCY) {
      console.info('Occupancy detection disabled');
      return;
    }

    const id = setInterval(updateIsOccupied, INTERVAL);
    updateIsOccupied();

    return () => clearInterval(id);
  }, [updateIsOccupied]);

  return occupied;
};

export default useOccupied;
