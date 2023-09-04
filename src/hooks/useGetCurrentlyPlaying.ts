import { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import useRequest from '../api/useRequest.ts';
import useDeepEqualMemo from './useDeepEqualMemo.ts';

import AppEnv from '../AppEnv.ts';

const useGetCurrentlyPlaying = (enable: boolean) => {
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

          if (response.data) {
            // Clear some of the values that we don't care about, but which
            // cause the object to change.
            response.data.actions.disallows = {};
            response.data.timestamp = 0;
            response.data.progress_ms = 0;
            response.data.is_playing = true;
          }

          return response;
        }),
    [token]
  );

  const { loading, previouslyLoaded, data, loadData } =
    useRequest(getCurrentlyPlaying);

  const currentlyPlaying =
    useDeepEqualMemo<SpotifyApi.CurrentlyPlayingObject | null>(data);

  useEffect(() => {
    let id: number | undefined = undefined;

    if (enable) {
      id = setInterval(loadData, AppEnv.SPOTIFY_INTERVAL);
      loadData();
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [loadData, enable]);

  return {
    loading,
    previouslyLoaded,
    currentlyPlaying,
  };
};

export default useGetCurrentlyPlaying;
