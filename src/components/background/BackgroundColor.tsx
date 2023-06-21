import React from 'react';

import useImageColor from '../../hooks/useImageColor.ts';

interface BackgroundColorProps {
  url: string;
}

const BackgroundColor: React.FC<BackgroundColorProps> = ({ url }) => {
  const color = useImageColor(url);

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
