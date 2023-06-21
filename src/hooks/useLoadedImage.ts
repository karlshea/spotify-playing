import { useEffect, useState } from 'react';

const useLoadedImage = (url: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!url) {
      setImage(null);
      return;
    }

    const updateImage = (image: HTMLImageElement) => {
      setImage(image.complete ? image : null);
    };

    const image = new Image();
    image.setAttribute('crossOrigin', '');

    image.addEventListener('load', () => updateImage(image), { once: true });
    image.addEventListener('error', () => updateImage(image), { once: true });

    image.src = url;
  }, [url]);

  return image;
};

export default useLoadedImage;
