import React from 'react';

import useImageColor from '../../../hooks/useImageColor.ts';

interface BackgroundColorProps {
  canvas: HTMLCanvasElement;
  loadedUrl: string | null;
}

const BackgroundColor: React.FC<BackgroundColorProps> = ({
  canvas,
  loadedUrl,
}) => {
  const color = useImageColor(canvas, loadedUrl);

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
