import React from 'react';

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const Track: React.FC<TrackProps> = ({ track }) => (
  <div className="currently-playing">
    <div
      className="currently-playing--bg"
      style={{ backgroundImage: `url(${track.album.images[0].url}` }}
    ></div>

    <div className="currently-playing--content">
      <div className="currently-playing--content--inner">
        <img src={track.album.images[0].url} />

        <h1>{track.name}</h1>

        <h2>{track.artists.map((artist) => artist.name).join(', ')}</h2>

        <h3>{track.album.name}</h3>
      </div>
    </div>
  </div>
);

export default Track;
