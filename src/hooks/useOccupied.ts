import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const INTERVAL = import.meta.env.VITE_OCCUPIED_INTERVAL;
const HA_URL = import.meta.env.VITE_HA_URL;
const HA_ENTITY = import.meta.env.VITE_HA_ENTITY;
const HA_TOKEN = import.meta.env.VITE_HA_TOKEN;

const useOccupied = () => {
  const [occupied, setOccupied] = useState(false);

  const updateIsOccupied = useCallback(() => {
    axios
      .get(`${HA_URL}/api/states/${HA_ENTITY}`, {
        headers: {
          Authorization: `Bearer ${HA_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
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
