'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import supabase from '@/utils/supabase-browser';
import { Database } from '@/types/database.types';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Profiles['avatar_url'] | undefined;
  size: number;
  onUpload: (url: string) => void;
}) {
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url'] | null>(
    null,
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      if (!file) {
        throw new Error('No file selected.');
      }
      const fileExt = file?.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
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
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label
          className="group my-4 flex h-min  items-center justify-center rounded-lg border border-transparent bg-gray-700 p-0.5 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-800 focus:z-10 focus:ring-4  focus:ring-gray-300 disabled:hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:disabled:hover:bg-gray-600"
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
          onChange={uploadAvatar}
          disabled={uploading}
          className="w-40 items-center justify-center rounded-md border border-gray-300 bg-gray-700 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        />
      </div>
    </div>
  );
}
