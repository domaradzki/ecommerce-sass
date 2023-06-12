'use client';

import { Sidebar, TextInput } from 'flowbite-react';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  HiTemplate,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiDocumentDuplicate,
  HiAnnotation,
  HiViewGridAdd,
} from 'react-icons/hi';

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    '/dashboard' === currentPage
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <HiTemplate size={32} color="gray" />
                  <span className="ml-3">Pulpit</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    'products' === currentPage
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <HiShoppingBag size={32} color="gray" />
                  <span className="ml-3">Produkty</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className={`flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    'integrations' === currentPage
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <HiViewGridAdd size={32} color="gray" />
                  <span className="ml-3">Integracje</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/auctions"
                  className={`flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    'auctions' === currentPage
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <HiAnnotation size={32} color="gray" />
                  <span className="ml-3">Aukcje</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className={`flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    'orders' === currentPage
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <HiDocumentDuplicate size={32} color="gray" />
                  <span className="ml-3">Zamówienia</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/todos"
                  className={`flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    'todos' === currentPage
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <HiPencil size={32} color="gray" />
                  <span className="ml-3">Zadania</span>
                </Link>
              </li>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/"
                icon={HiClipboard}
              >
                Docs
              </Sidebar.Item>
              <Sidebar.Item
                href="https://flowbite-react.com/"
                icon={HiCollection}
              >
                Components
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/issues"
                icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
