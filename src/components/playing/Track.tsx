import React, { useEffect, useState } from 'react';

import useImageCanvas from '../../hooks/useImageCanvas.ts';
import BackgroundBlurred from '../background/BackgroundBlurred.tsx';
import BackgroundColor from '../background/BackgroundColor.tsx';

import TrackObjectFull = SpotifyApi.TrackObjectFull;

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const USE_BLUR = JSON.parse(import.meta.env.VITE_PLAYING_USE_BLUR);

const Track: React.FC<TrackProps> = ({ track }) => {
  const { canvas, loadedUrl } = useImageCanvas(track.album.images[0].url);

  // Cache the old track until the image loads so all transitions happen at once.
  const [cachedTrack, setCachedTrack] = useState<TrackObjectFull>(track);
  useEffect(() => {
    if (loadedUrl === track.album.images[0].url) {
      setCachedTrack(track);
    }
  }, [loadedUrl, track]);

  const cachedTrackImage = cachedTrack.album.images[0];

  return (
    <div className="currently-playing">
      {canvas ? (
        USE_BLUR ? (
          <BackgroundBlurred url={canvas.toDataURL()} />
        ) : (
          <BackgroundColor canvas={canvas} />
        )
      ) : null}

      <div className="currently-playing--content">
        <div className="currently-playing--content--inner">
          <div
            className="currently-playing--image"
            style={{
              backgroundImage: canvas
                ? `url(${canvas.toDataURL()})`
                : undefined,
              width: cachedTrackImage.width,
              aspectRatio: `${cachedTrackImage.width} / ${cachedTrackImage.height}`,
            }}
          />

          <h1>{cachedTrack.name}</h1>

          <h2>{cachedTrack.album.name}</h2>

          <h3>{cachedTrack.artists.map((artist) => artist.name).join(', ')}</h3>
        </div>
      </div>
    </div>
  );
};

export default Track;
