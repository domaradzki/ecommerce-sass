import { Dropdown } from 'flowbite-react';
// import { useState } from "react";
// import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DropDownProfile() {
  // const { data: session } = useSession();
  const session = {
    user: { name: 'Greg', email: 'email@wp.pl', image: 'i,mage' },
  };
  const { name, email, image } = session?.user || {};
  // const [openPopover, setOpenPopover] = useState(false);

  // if (!email) return null;

  console.log('user', session);
  return (
    <Dropdown
      arrowIcon={false}
      color="transparent"
      fullSized={false}
      outline={false}
      pill={false}
      placement="bottom"
      positionInGroup="middle"
      title="Dropdown notiffication"
      trigger="click"
      label={
        <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-7 sm:w-7">
          <Image
            alt={email || 'alt'}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </span>
      }
    >
      {/* <!-- Dropdown menu --> */}
      <div
        className="z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
        id="dropdown-2"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900 dark:text-white" role="none">
            {session && name}
          </p>
          <p
            className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
            role="none"
          >
            {session && email}
          </p>
        </div>
        <ul className="py-1" role="none">
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
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Earnings
            </a>
          </li>
          <li>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              // onClick={() => signOut({ redirect: false })}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </li>
        </ul>
      </div>
    </Dropdown>
  );
}
