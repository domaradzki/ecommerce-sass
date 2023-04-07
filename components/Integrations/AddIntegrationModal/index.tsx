import { Button, Label, Modal, TextInput } from 'flowbite-react';
import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
import { HiPlus } from 'react-icons/hi';
type Integrations = Database['public']['Tables']['integrations']['Row'];

const AddIntegrationModal: FC = function () {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [isOpen, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  interface InitialData {
    login: string | null;
    name: string | null;
    password: string | null;
    url: string | null;
  }

  const initialData: InitialData = {
    login: '',
    name: '',
    password: '',
    url: '',
  };
  const [data, setData] = useState(initialData);
  const handleChangeData = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
      console.log(e.currentTarget.value);
      // e.focus();
    },
    [data],
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  const hanleSubmitIntegration = () => {
    setOpen(false);
  };

  console.log(data);
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
      {typeof window !== 'undefined' && (
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
                  <TextInput
                    id="logo"
                    key="logo"
                    name="logo"
                    placeholder="App logo"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="Name">Nazwa</Label>
                <div className="mt-1">
                  <TextInput
                    id="Name"
                    name="name"
                    key="name"
                    required={true}
                    shadow={true}
                    value={data.name || ''}
                    type="text"
                    placeholder="App name"
                    onChange={handleChangeData}
                    autoFocus
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="type">Typ</Label>
                <div className="mt-1">
                  <TextInput
                    id="type"
                    name="type"
                    key="type"
                    type="text"
                    placeholder="Typ"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="login">Url</Label>
                <div className="mt-1">
                  <TextInput
                    id="url"
                    name="url"
                    key="url"
                    placeholder="company.com"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="login">Login</Label>
                <div className="mt-1">
                  <TextInput
                    id="login"
                    name="login"
                    key="login"
                    placeholder="Login"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Hasło</Label>
                <div className="mt-1">
                  <TextInput
                    id="password"
                    name="password"
                    key="password"
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
