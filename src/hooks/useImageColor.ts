import { useEffect, useState } from 'react';
import { createPalette } from 'modern-palette';

const useImageColor = (canvas: HTMLCanvasElement) => {
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
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
  }, [canvas]);

  return color;
};

export default useImageColor;
