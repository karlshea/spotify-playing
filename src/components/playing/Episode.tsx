import React from 'react';

interface EpisodeProps {
  episode: SpotifyApi.EpisodeObjectFull;
}

const Episode: React.FC<EpisodeProps> = ({ episode }) => {
  return <h1>{episode.name}</h1>;
};

export default Episode;
