import { useEffect, useState } from 'react';
import { Database } from '@/types/database.types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import type { ImageLoaderProps } from 'next/image';

export default function GetImage({
  item,
  src,
}: {
  item: string | null;
  src: string;
}) {
  const supabase = useSupabaseClient<Database>();
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

    if (item && !logo) downloadImage(item);
  }, []);
  return (
    <img
      className="mb-3 h-32 w-32 rounded-full object-contain shadow-lg"
      src={logo}
      alt={src}
    />
  );
}
