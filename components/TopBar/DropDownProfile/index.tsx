import { Dropdown } from 'flowbite-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useUser } from '@/utils/hooks/useUser';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image';
import { Database } from '@/types/database.types';
import Image from 'next/image';
import type { ImageLoaderProps } from 'next/image';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function DropDownProfile() {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [username, setUsername] = useState<Profiles['username']>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);
  const [profilImage, setProfilImage] = useState<ImageLoaderProps['src']>('');

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
        setProfilImage(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url]);

  useEffect(() => {
    if (user.userDetails) {
      setUsername(user.userDetails.full_name);
      setAvatarUrl(user.userDetails.avatar_url);
    }
  }, [user, supabase]);

  const email = user.user?.email;

  return (
    <Dropdown
      arrowIcon={false}
      color="transparent"
      fullSized={false}
      outline={false}
      pill={false}
      placement="bottom"
      positionInGroup="middle"
      title="Dropdown profile"
      trigger="click"
      label={
        <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-7 sm:w-7">
          {/* <Image
            alt={username || 'alt'}
            src={profilImage}
            width={40}
            height={40}
          /> */}
        </span>
      }
    >
      {/* <!-- Dropdown menu --> */}
      <div
        className="z-50 mt-1 mb-5 divide-y divide-gray-100 bg-white px-5 text-base dark:divide-gray-600 dark:bg-gray-700"
        id="dropdown-2"
      >
        <div className="px-4 pt-0 pb-4" role="none">
          <p
            className="truncate py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            role="none"
          >
            {user && username}
          </p>
          <p
            className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
            role="none"
          >
            {user && email}
          </p>
        </div>
        <ul className="pb- pt-1" role="none">
          <li>
            <Link
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Moje konto
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Ustawienia
            </a>
          </li>
          <li>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => supabase.auth.signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Wyloguj</p>
            </button>
          </li>
        </ul>
      </div>
    </Dropdown>
  );
}
