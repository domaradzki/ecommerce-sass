import { Button, Modal } from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";

const DeleteIntegrationModal: FC = function () {
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
      <Button color="failure" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
        </div>
      </Button>
      {typeof window !== "undefined" && (
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Header className="px-6 pt-6 pb-0">
            <span className="sr-only">Usuwanie integracji</span>
          </Modal.Header>
          <Modal.Body className="px-6 pt-0 pb-6">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-500" />
              <p className="text-xl text-gray-500">
                Czy napewno chcesz usunąć tę integrację?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={() => setOpen(false)}>
                  Tak, jestem pewien
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  Nie, anuluj
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DeleteIntegrationModal;
