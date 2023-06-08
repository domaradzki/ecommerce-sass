'use client';

import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase-browser';
import type { ImageLoaderProps } from 'next/image';

export default function GetImage({
  img,
  src,
}: {
  img: string | null;
  src: string;
}) {
  const [logo, setLogo] = useState<ImageLoaderProps['src']>('');

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from(src).download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setLogo(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (img) downloadImage(img);
  }, [img, src]);
  return (
    <img
      className="mb-3 h-32 w-32 rounded-full object-contain shadow-lg"
      src={logo}
      alt={src}
    />
  );
}
