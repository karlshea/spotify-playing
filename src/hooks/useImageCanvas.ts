import { useEffect, useState } from 'react';

const useImageCanvas = (url: string) => {
  const [data, setData] = useState<{
    loadedUrl?: string;
    canvas?: HTMLCanvasElement;
  }>({});

  useEffect(() => {
    if (!url) {
      setData({});
      return;
    }

    const updateCanvas = (image: HTMLImageElement) => {
      const canvas = document.createElement('canvas');

      const context = canvas.getContext('2d', { alpha: false });

      if (!(context && image.complete)) {
        setData({});
        return;
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0);

      setData({
        loadedUrl: image.src,
        canvas,
      });
    };

    const image = new Image();
    image.setAttribute('crossOrigin', '');

    image.addEventListener('load', () => updateCanvas(image), { once: true });
    image.addEventListener('error', () => updateCanvas(image), { once: true });

    image.src = url;

    return () => {
      image.remove();
    };
  }, [url]);

  return data;
};

export default useImageCanvas;
