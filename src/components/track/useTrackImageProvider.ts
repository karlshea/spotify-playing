import { useContext } from 'react';

import { TrackImageContext } from './TrackImageProvider.tsx';

const useTrackImageProvider = () => {
  const context = useContext(TrackImageContext);

  if (context === undefined) {
    throw new Error(
      'useTrackImageProvider must be within an TrackImageContext Provider'
    );
  }

  return context;
};

export default useTrackImageProvider;
