import './App.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import CurrentEpisode from './components/current-playing/CurrentEpisode.tsx';
import CurrentTrack from './components/current-playing/CurrentTrack.tsx';
import Loading from './components/Loading.tsx';
import NotPlaying from './components/NotPlaying.tsx';

const INTERVAL = 3000;

const App = () => {
  const { token } = useContext(AuthContext);

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
      });
  }, [token]);

  useEffect(() => {
    const id = setInterval(getCurrentlyPlaying, INTERVAL);
    getCurrentlyPlaying();

    return () => clearInterval(id);
  }, [getCurrentlyPlaying]);

  if (!currentlyPlaying && loading) {
    return <Loading />;
  }

  if (!currentlyPlaying) {
    return <NotPlaying />;
  }

  if (currentlyPlaying.currently_playing_type === 'track') {
    return (
      <CurrentTrack
        track={currentlyPlaying.item as SpotifyApi.TrackObjectFull}
      />
    );
  }

  if (currentlyPlaying.currently_playing_type === 'episode') {
    return (
      <CurrentEpisode
        episode={currentlyPlaying.item as SpotifyApi.EpisodeObjectFull}
      />
    );
  }

  return <h1>Unknown State</h1>;
};

export default App;
