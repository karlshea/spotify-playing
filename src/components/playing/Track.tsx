import React from 'react';

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const image = track.album.images[0];

  return (
    <div className="currently-playing">
      <div
        className="currently-playing--bg"
        style={{ backgroundImage: `url(${image.url}` }}
      ></div>

      <div className="currently-playing--content">
        <div className="currently-playing--content--inner">
          <div
            className="currently-playing--image"
            style={{
              backgroundImage: `url(${image.url}`,
              width: image.width,
              aspectRatio: `${image.width} / ${image.height}`,
            }}
          ></div>

          <h1>{track.name}</h1>

          <h2>{track.artists.map((artist) => artist.name).join(', ')}</h2>

          <h3>{track.album.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Track;
