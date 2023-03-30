import type { FC } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { FADE_IN_ANIMATION_SETTINGS } from '@/utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { DarkThemeToggle, Navbar } from 'flowbite-react';
import { useSignInModal } from '@/components/SignInModal';
import DropDownNotification from '@/components//DropDownNotification';
import DropDownApps from '@/components//DropDownApps';
import DropDownProfile from '@/components//DropDownProfile';

const MainNavbar: FC = function () {
  const user = useUser();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <Navbar fluid>
      <SignInModal />
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img
                alt=""
                src="/favicon.ico"
                className="mr-3 h-6 sm:h-8"
                width={'100%'}
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Giedee SASS
              </span>
            </Navbar.Brand>
            <form action="#" method="GET" className="hidden lg:block lg:pl-3.5">
              <label htmlFor="topbar-search" className="sr-only">
                Szukaj
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center">
            <div className="mr-3 -mb-1 hidden sm:block">
              <a
                className="github-button"
                href="https://github.com/themesberg/flowbite-admin-dashboard"
                data-color-scheme="no-preference: dark; light: light; dark: light;"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themesberg/flowbite-admin-dashboard on GitHub"
              >
                Github
              </a>
            </div>
            {/* <!-- Search mobile --> */}
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden"
            >
              <span className="sr-only">Search</span>
              {/* <!-- Search icon --> */}
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* <!-- Notifications --> */}
            <DropDownNotification />
            {/* <!-- Apps --> */}
            <DropDownApps />
            {/* <!-- Dark mode --> */}
            <DarkThemeToggle />
            {/* <!-- Search mobile --> */}
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden"
            >
              <span className="sr-only">Search</span>
              {/* <!-- Search icon --> */}
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* <!-- Profile --> */}
            <div>
              <AnimatePresence>
                {/* {!session ? ( */}
                {!user ? (
                  <motion.button
                    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                    onClick={() => setShowSignInModal(true)}
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Zaloguj
                  </motion.button>
                ) : (
                  // <UserDropdown />
                  <DropDownProfile />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default MainNavbar;
