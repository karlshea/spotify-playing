import React from 'react';

interface CurrentTrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const CurrentTrack: React.FC<CurrentTrackProps> = ({ track }) => {
  return (
    <div className="current-playing">
      <div
        className="current-playing--bg"
        style={{ backgroundImage: `url(${track.album.images[0].url}` }}
      ></div>

      <div className="current-playing-content">
        <img src={track.album.images[0].url} />

        <h1>{track.name}</h1>

        <h2>{track.artists.map((artist) => artist.name).join(', ')}</h2>

        <h3>
          <em>{track.album.name}</em>
        </h3>
      </div>
    </div>
  );
};

export default CurrentTrack;
