import { useEffect, useRef, useState } from 'react';

const useImageCanvas = (url: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !url) {
      setLoadedUrl(null);
      return;
    }

    const canvas = canvasRef.current;

    const updateCanvas = (image: HTMLImageElement) => {
      const context = canvas.getContext('2d', { alpha: false });

      if (!(context && image.complete)) {
        setLoadedUrl(null);
        return;
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0);

      setLoadedUrl(image.src);
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

  return {
    canvas: canvasRef.current,
    loadedUrl,
  };
};

export default useImageCanvas;
