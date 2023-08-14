import React, { useEffect, createContext, useCallback, useRef } from 'react';

interface ITrackImageContext {
  trackImageCanvasSubscriber: (
    id: string
  ) => (instance: HTMLCanvasElement | null) => void;
}

export const TrackImageContext = createContext<ITrackImageContext | undefined>(
  undefined
);

interface TrackImageProviderProps {
  sourceCanvas: HTMLCanvasElement;
  loadedUrl: string | null;
  children?: React.ReactNode;
}

const TrackImageProvider: React.FC<TrackImageProviderProps> = ({
  sourceCanvas,
  loadedUrl,
  children,
}) => {
  const canvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());

  const trackImageCanvasSubscriber = useCallback(
    (id: string) => (instance: HTMLCanvasElement | null) => {
      if (instance) {
        canvasRefs.current.set(id, instance);
      } else {
        canvasRefs.current.delete(id);
      }
    },
    []
  );

  useEffect(() => {
    canvasRefs.current.forEach((canvas) => {
      const context = canvas.getContext('2d', { alpha: false });

      if (context) {
        canvas.width = sourceCanvas.width;
        canvas.height = sourceCanvas.height;
        context.drawImage(sourceCanvas, 0, 0);
      }
    });
  }, [sourceCanvas, loadedUrl]);

  return (
    <TrackImageContext.Provider value={{ trackImageCanvasSubscriber }}>
      {children}
    </TrackImageContext.Provider>
  );
};

export default TrackImageProvider;
