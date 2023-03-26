import { Sidebar, TextInput } from 'flowbite-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  HiTemplate,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
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
              <Sidebar.Item
                href="/dashboard"
                icon={HiTemplate}
                className={
                  '/dashboard' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Pulpit
              </Sidebar.Item>
              <Sidebar.Item
                href="/products"
                icon={HiShoppingBag}
                className={
                  '/products' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Produkty
              </Sidebar.Item>
              <Sidebar.Item
                href="/integrations"
                icon={HiViewGridAdd}
                className={
                  '/integrations' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Integracje
              </Sidebar.Item>
              <Sidebar.Item
                href="/auctions"
                icon={HiAnnotation}
                className={
                  '/auctions' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Aukcje
              </Sidebar.Item>
              <Sidebar.Item
                href="/orders"
                icon={HiDocumentDuplicate}
                className={
                  '/orders' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Zamówienia
              </Sidebar.Item>
              <Sidebar.Item
                href="/todos"
                icon={HiPencil}
                className={
                  '/todos' === currentPage ? 'bg-gray-100 dark:bg-gray-700' : ''
                }
              >
                Zadania
              </Sidebar.Item>
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
