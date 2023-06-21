import { useEffect, useState } from 'react';
import { createPalette } from 'modern-palette';

const useImageColor = (src: string) => {
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    const getImageColor = (image: HTMLImageElement) => {
      const canvas = new OffscreenCanvas(0, 0);
      const context = canvas.getContext('2d', { alpha: false });

      if (!context || !image.complete) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0);

      const palette = createPalette({
        maxColors: 4,
        samples: [canvas],
      });

      // Generate palette colors data
      palette.generate();

      // Find the nearest color on the darker side.
      const selectedColor = palette.findNearestColor('#888888')?.value;

      if (import.meta.env.DEV) {
        console.group('Palette');
        palette.getColors('hex').map((c) => {
          console.log(
            `%s%c${c.value}`,
            c.value === selectedColor ? '-> ' : '   ',
            `background-color: ${c.value}`
          );
        });
        console.groupEnd();
      }

      setColor(selectedColor);
    };

    const image = new Image();
    image.setAttribute('crossOrigin', '');

    image.addEventListener('load', () => getImageColor(image), { once: true });
    image.addEventListener('error', () => getImageColor(image), { once: true });

    image.src = src;

    return () => {
      image.remove();
    };
  }, [src]);

  return color;
};

export default useImageColor;
