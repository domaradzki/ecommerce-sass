import { Button, Label, Modal, TextInput } from 'flowbite-react';
import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
import { HiPlus } from 'react-icons/hi';
type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function AddIntegrationModal({ isOpen, setOpen }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [hasMounted, setHasMounted] = useState(false);

  const [name, setName] = useState<Integrations['name']>(null);
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, [isOpen]);

  const hanleSubmitIntegration = () => {
    () => setOpen(false);
  };

  console.log('data', data);
  if (!hasMounted) {
    return null;
  }
  return (
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
                autoFocus
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
                onChange={(e) => handleChangeData(e)}
                ref={inputRef}
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
                onChange={(e) => handleChangeData(e)}
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
  );
}
