import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { HiPencilAlt, HiTrash, HiUpload } from "react-icons/hi";

const EditProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Button color="info" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
      </Button>
      {typeof window !== "undefined" && (
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edycja aukcji</strong>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <Label htmlFor="productName">Product name</Label>
                  <TextInput
                    id="productName"
                    name="productName"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <TextInput
                    id="category"
                    name="category"
                    placeholder="Electronics"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <TextInput
                    id="brand"
                    name="brand"
                    placeholder="Apple"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <TextInput
                    id="price"
                    name="price"
                    type="number"
                    placeholder="$2300"
                    className="mt-1"
                  />
                </div>
                <div className="lg:col-span-2">
                  <Label htmlFor="productDetails">Product details</Label>
                  <Textarea
                    id="productDetails"
                    name="productDetails"
                    placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                    rows={6}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-5">
                  <div>
                    <Image
                      alt="Apple iMac 1"
                      src="https://raw.githubusercontent.com/themesberg/flowbite-react-admin-dashboard/main/public/images/products/apple-imac-1.png"
                      className="h-24"
                      width={40}
                      height={40}
                    />
                    <a href="#" className="cursor-pointer">
                      <span className="sr-only">Delete</span>
                      <HiTrash className="-mt-5 text-2xl text-red-600" />
                    </a>
                  </div>
                  <div>
                    <Image
                      alt="Apple iMac 2"
                      src="https://raw.githubusercontent.com/themesberg/flowbite-react-admin-dashboard/main/public/images/products/apple-imac-2.png"
                      className="h-24"
                      width={40}
                      height={40}
                    />
                    <a href="#" className="cursor-pointer">
                      <span className="sr-only">Delete</span>
                      <HiTrash className="-mt-5 text-2xl text-red-600" />
                    </a>
                  </div>
                  <div>
                    <Image
                      alt="Apple iMac 3"
                      src="https://raw.githubusercontent.com/themesberg/flowbite-react-admin-dashboard/main/public/images/products/apple-imac-3.png"
                      className="h-24"
                      width={40}
                      height={40}
                    />
                    <a href="#" className="cursor-pointer">
                      <span className="sr-only">Delete</span>
                      <HiTrash className="-mt-5 text-2xl text-red-600" />
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="flex w-full items-center justify-center">
                    <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <HiUpload className="text-4xl text-gray-300" />
                        <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                          Upload a file or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={() => setOpen(false)}>
              Save all
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditProductModal;
