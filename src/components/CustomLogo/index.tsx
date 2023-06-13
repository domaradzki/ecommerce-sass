'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import supabase from '@/utils/supabase-browser';
import { Database } from '@/types/database.types';
type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function CustomLogo({
  url,
  size,
  onUpload,
}: {
  url: Integrations['logo'] | undefined;
  size: number;
  onUpload: (url: string) => void;
}) {
  const [logoUrl, setLogoUrl] = useState<Integrations['logo'] | undefined>(
    null,
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('logo')
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setLogoUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  const uploadLogo: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const uid = uuidv4();
      const file = event.target.files[0];
      if (!file) {
        throw new Error('No file selected.');
      }
      const fileExt = file?.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('logo')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }
      onUpload(filePath);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Error uploading avatar!');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {logoUrl ? (
        <img src={logoUrl} alt="Logo" className="avatar image p-2" />
      ) : (
        <div className="avatar no-image p-2" />
      )}
      <div>
        <label
          className="f ocus:outline-none group flex h-min items-center justify-center rounded-md border border-gray-300 bg-gray-900 px-3 py-2 font-medium text-white transition-all duration-75 hover:border-gray-800   hover:text-white active:bg-gray-100 active:text-gray-800"
          htmlFor="single"
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadLogo}
          disabled={uploading}
          className="bg-primary-700 w-40 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        />
      </div>
    </div>
  );
}
