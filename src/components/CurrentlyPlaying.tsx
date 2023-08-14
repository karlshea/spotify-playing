import React from 'react';

import Episode from './playing/Episode.tsx';
import NoItem from './playing/NoItem.tsx';
import PlaylistDJ from './playing/PlaylistDJ.tsx';
import Track from './track/Track.tsx';

interface CurrentlyPlayingProps {
  currentlyPlaying: SpotifyApi.CurrentlyPlayingObject;
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  currentlyPlaying,
}) => {
  if (currentlyPlaying.currently_playing_type === 'track') {
    if (currentlyPlaying.item) {
      return (
        <Track track={currentlyPlaying.item as SpotifyApi.TrackObjectFull} />
      );
    }

    if (
      currentlyPlaying.context?.uri ===
      'spotify:playlist:37i9dQZF1EYkqdzj48dyYq' // Spotify DJ
    ) {
      return <PlaylistDJ />;
    }

    return <NoItem />;
  }

  if (currentlyPlaying.currently_playing_type === 'episode') {
    return (
      <Episode
        episode={currentlyPlaying.item as SpotifyApi.EpisodeObjectFull}
      />
    );
  }

  return <h1>Unknown State</h1>;
};

export default CurrentlyPlaying;
