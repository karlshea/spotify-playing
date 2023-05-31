import React from 'react';

import useOnLoadImage from '../../hooks/useOnLoadImage.ts';

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const trackImage = track.album.images[0];

  const trackImageUrl = useOnLoadImage(trackImage.url);

  return (
    <div className="currently-playing">
      <div
        className="currently-playing--bg"
        style={{ backgroundImage: `url(${trackImageUrl}` }}
      ></div>

      <div className="currently-playing--content">
        <div className="currently-playing--content--inner">
          <div
            className="currently-playing--image"
            style={{
              backgroundImage: `url(${trackImageUrl}`,
              width: trackImage.width,
              aspectRatio: `${trackImage.width} / ${trackImage.height}`,
            }}
          ></div>

          <h1>{track.name}</h1>

          <h2>{track.album.name}</h2>

          <h3>{track.artists.map((artist) => artist.name).join(', ')}</h3>
        </div>
      </div>
    </div>
  );
};

export default Track;
