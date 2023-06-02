'use client';

import { Button, Modal } from 'flowbite-react';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { HiOutlineExclamationCircle, HiTrash } from 'react-icons/hi';

const DeleteProductModal: FC = function () {
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
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
      </Button>
      {typeof window !== 'undefined' && (
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Header className="px-3 pt-3 pb-0">
            <span className="sr-only">Kończenie aukcji</span>
          </Modal.Header>
          <Modal.Body className="px-6 pb-6 pt-0">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-600" />
              <p className="text-lg text-gray-500 dark:text-gray-300">
                Zakończyć aukcje?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={() => setOpen(false)}>
                  Tak
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  Nie
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DeleteProductModal;
