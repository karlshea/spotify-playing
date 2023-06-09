import React from 'react';

import useImageColor from '../../hooks/useImageColor.ts';

interface BackgroundColorProps {
  canvas: HTMLCanvasElement;
}

const BackgroundColor: React.FC<BackgroundColorProps> = ({ canvas }) => {
  const color = useImageColor(canvas);

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
