import { useEffect, useState } from 'react';
import { Palette } from 'modern-palette';

const useImageColor = (canvas: HTMLCanvasElement, loadedUrl: string | null) => {
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    if (!loadedUrl) {
      setColor('#000000');
      return;
    }

    const palette = new Palette({
      maxColors: 4,
      samples: [canvas],
    });

    // Generate palette colors data
    palette.generate().then((colors) => {
      // Find the nearest color on the darker side.
      const selectedColor = palette.match('#888888')?.color.hex;

      if (import.meta.env.DEV) {
        console.group('Palette');
        colors.map((c) => {
          console.log(
            `%s%c${c.hex}`,
            c.hex === selectedColor ? '-> ' : '   ',
            `background-color: ${c.hex}`
          );
        });
        console.groupEnd();
      }

      setColor(selectedColor);
    });
  }, [canvas, loadedUrl]);

  return color;
};

export default useImageColor;
