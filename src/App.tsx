import './App.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import CurrentEpisode from './components/CurrentEpisode.tsx';
import CurrentTrack from './components/CurrentTrack.tsx';
import NotPlaying from './components/NotPlaying.tsx';

const INTERVAL = 3000;

const App = () => {
  const { token } = useContext(AuthContext);

  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<SpotifyApi.CurrentlyPlayingObject | null>();

  const getCurrentlyPlaying = useCallback(() => {
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
      });
  }, [token]);

  useEffect(() => {
    const id = setInterval(getCurrentlyPlaying, INTERVAL);
    getCurrentlyPlaying();

    return () => clearInterval(id);
  }, [getCurrentlyPlaying]);

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
