import React from 'react';

interface BackgroundBlurredProps {
  url: string;
}

const BackgroundBlurred: React.FC<BackgroundBlurredProps> = ({ url }) => (
  <div
    className="currently-playing--bg use-blur"
    style={{ backgroundImage: `url(${url})` }}
  />
);

export default BackgroundBlurred;
