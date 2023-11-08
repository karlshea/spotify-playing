import React, { useEffect, useState } from 'react';

import AppEnv from '../../AppEnv.ts';
import useImageCanvas from '../../hooks/useImageCanvas.ts';
import BackgroundBlurred from './background/BackgroundBlurred.tsx';
import BackgroundColor from './background/BackgroundColor.tsx';
import Content from './Content.tsx';
import TrackImageProvider from './TrackImageProvider.tsx';

import TrackObjectFull = SpotifyApi.TrackObjectFull;

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const { canvas, loadedUrl } = useImageCanvas(track.album.images[0].url);

  // Cache the old track until the image loads so all transitions happen at once.
  const [cachedTrack, setCachedTrack] = useState<TrackObjectFull>(track);

  useEffect(() => {
    if (loadedUrl === track.album.images[0].url) {
      setCachedTrack(track);
    }
  }, [loadedUrl, track]);

  return (
    <TrackImageProvider sourceCanvas={canvas} loadedUrl={loadedUrl}>
      <div className="currently-playing">
        {AppEnv.PLAYING_USE_BLUR ? <BackgroundBlurred /> : <BackgroundColor />}

        <Content track={cachedTrack} />
      </div>
    </TrackImageProvider>
  );
};

export default Track;
