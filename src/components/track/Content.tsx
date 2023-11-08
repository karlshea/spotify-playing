import React from 'react';

import useTrackImageProvider from './useTrackImageProvider.ts';

import TrackObjectFull = SpotifyApi.TrackObjectFull;

interface ContentProps {
  track: TrackObjectFull;
}

const Content: React.FC<ContentProps> = ({ track }) => {
  const { trackImageCanvasSubscriber } = useTrackImageProvider();

  const trackImage = track.album.images[0];

  return (
    <div className="currently-playing--content">
      <div className="currently-playing--content--inner">
        <canvas
          ref={trackImageCanvasSubscriber('currently-playing--image')}
          className="currently-playing--image"
          style={{
            width: trackImage.width,
            aspectRatio: `${trackImage.width} / ${trackImage.height}`,
          }}
        />

        <h1>{track.name}</h1>

        <h2>{track.album.name}</h2>

        <h3>{track.artists.map((artist) => artist.name).join(', ')}</h3>
      </div>
    </div>
  );
};

export default Content;
