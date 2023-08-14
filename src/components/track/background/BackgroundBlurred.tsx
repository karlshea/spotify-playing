import React from 'react';
import useTrackImageProvider from '../useTrackImageProvider.ts';

const BackgroundBlurred: React.FC = () => {
  const { trackImageCanvasSubscriber } = useTrackImageProvider();

  return (
    <canvas
      className="currently-playing--bg use-blur"
      ref={trackImageCanvasSubscriber('currently-playing--bg')}
    />
  );
};

export default BackgroundBlurred;
