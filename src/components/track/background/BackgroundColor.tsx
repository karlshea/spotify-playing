import React from 'react';

import useImageColor from '../../../hooks/useImageColor.ts';
import useTrackImageProvider from '../useTrackImageProvider.ts';

const BackgroundColor: React.FC = () => {
  const { sourceCanvas, loadedUrl } = useTrackImageProvider();

  const color = useImageColor(sourceCanvas, loadedUrl);

  return (
    <div
      className="currently-playing--bg use-color"
      style={{
        backgroundColor: color ?? '#000000',
      }}
    />
  );
};

export default BackgroundColor;
