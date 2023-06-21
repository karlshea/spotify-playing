import React from 'react';

import useImageColor from '../../hooks/useImageColor.ts';

interface BackgroundColorProps {
  image: HTMLImageElement;
}

const BackgroundColor: React.FC<BackgroundColorProps> = ({ image }) => {
  const color = useImageColor(image);

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
