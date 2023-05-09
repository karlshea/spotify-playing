import React from 'react';

interface CurrentEpisodeProps {
  episode: SpotifyApi.EpisodeObjectFull;
}

const CurrentEpisode: React.FC<CurrentEpisodeProps> = ({ episode }) => {
  return <h1>{episode.name}</h1>;
};

export default CurrentEpisode;
