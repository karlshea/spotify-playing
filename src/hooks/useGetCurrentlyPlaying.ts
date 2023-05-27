import { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import useRequest from '../api/useRequest.ts';

const INTERVAL = import.meta.env.VITE_SPOTIFY_INTERVAL;

const useGetCurrentlyPlaying = () => {
  const { token } = useContext(AuthContext);

  const getCurrentlyPlaying = useCallback(
    () =>
      axios
        .get<SpotifyApi.CurrentlyPlayingObject | null>(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 204) {
            response.data = null;
          }

          return response;
        }),
    [token]
  );

  const {
    loading,
    previouslyLoaded,
    data: currentlyPlaying,
    loadData,
  } = useRequest(getCurrentlyPlaying);

  useEffect(() => {
    const id = setInterval(loadData, INTERVAL);
    loadData();

    return () => clearInterval(id);
  }, [loadData]);

  return {
    loading,
    previouslyLoaded,
    currentlyPlaying,
  };
};

export default useGetCurrentlyPlaying;
