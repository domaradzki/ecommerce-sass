import { Button, Label, Modal, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";

const AddIntegrationModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const hanleSubmitIntegration = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="dark"
        onClick={() => setOpen(true)}
        className="bg-primary-700"
      >
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Dodaj integracje
        </div>
      </Button>
      {typeof window !== "undefined" && (
        <Modal
          onClose={() => setOpen(false)}
          show={isOpen}
          suppressHydrationWarning={true}
        >
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Dodaj integracje</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="logo">Logo</Label>
                <div className="mt-1">
                  <TextInput id="logo" name="logo" placeholder="App logo" />
                </div>
              </div>
              <div>
                <Label htmlFor="Name">Nazwa</Label>
                <div className="mt-1">
                  <TextInput id="Name" name="Name" placeholder="App name" />
                </div>
              </div>
              <div>
                <Label htmlFor="type">Typ</Label>
                <div className="mt-1">
                  <TextInput id="type" name="type" placeholder="Typ" />
                </div>
              </div>
              <div>
                <Label htmlFor="www">Adres</Label>
                <div className="mt-1">
                  <TextInput
                    id="www"
                    name="www"
                    placeholder="company.com"
                    type="www"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="login">Login</Label>
                <div className="mt-1">
                  <TextInput id="login" name="login" placeholder="Login" />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Hasło</Label>
                <div className="mt-1">
                  <TextInput
                    id="password"
                    name="password"
                    placeholder="Hasło"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={hanleSubmitIntegration}>
              Zapisz
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AddIntegrationModal;
