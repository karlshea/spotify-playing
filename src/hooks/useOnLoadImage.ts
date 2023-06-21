import { useEffect, useState } from 'react';

const useOnLoadImage = (url: string) => {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(url);

  useEffect(() => {
    if (!url) {
      setLoadedUrl(null);
      return;
    }

    const updateStatus = (image: HTMLImageElement) => {
      setLoadedUrl(image.complete ? image.src : null);
    };

    const image = new Image();

    image.addEventListener('load', () => updateStatus(image), { once: true });
    image.addEventListener('error', () => updateStatus(image), { once: true });

    image.src = url;

    return () => {
      image.remove();
    };
  }, [url]);

  return loadedUrl;
};

export default useOnLoadImage;
