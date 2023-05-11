import './App.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import Loading from './components/Loading.tsx';
import NotPlaying from './components/NotPlaying.tsx';

const INTERVAL = 3000;

const App = () => {
  const { token } = useContext(AuthContext);

  const [previouslyLoaded, setPreviouslyLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<SpotifyApi.CurrentlyPlayingObject | null>();

  const getCurrentlyPlaying = useCallback(() => {
    setLoading(true);

    axios
      .get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          setCurrentlyPlaying(null);
        }
        if (response.status === 200) {
          setCurrentlyPlaying(response.data);
        }
        setLoading(false);
        setPreviouslyLoaded(true);
      });
  }, [token]);

  useEffect(() => {
    const id = setInterval(getCurrentlyPlaying, INTERVAL);
    getCurrentlyPlaying();

    return () => clearInterval(id);
  }, [getCurrentlyPlaying]);

  if (!currentlyPlaying && !previouslyLoaded && loading) {
    return <Loading />;
  }

  if (!currentlyPlaying) {
    return <NotPlaying />;
  }

  return <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />;
};

export default App;
