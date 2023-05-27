import './App.css';
import { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import useRequest from './api/useRequest.ts';
import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import Loading from './components/Loading.tsx';
import NotPlaying from './components/NotPlaying.tsx';

const INTERVAL = 3000;

const App = () => {
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

  if (!currentlyPlaying && !previouslyLoaded && loading) {
    return <Loading />;
  }

  if (!currentlyPlaying) {
    return <NotPlaying />;
  }

  return <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />;
};

export default App;
