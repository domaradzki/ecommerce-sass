'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import supabase from '@/utils/supabase-browser';
import { User } from '@supabase/supabase-js';
import { useState, ChangeEvent } from 'react';
import { Database } from '@/types/database.types';
import { useAuth } from '@/components/AuthProvider';

import { useCustomModal } from '@/components/CustomModal';
import CustomLogo from '@/components/CustomLogo';
type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function AddIntegrationModal() {
  const { CustomModal, setShowCustomModal } = useCustomModal();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [name, setName] = useState<Integrations['name']>('');
  const [login, setLogin] = useState<Integrations['login']>(null);
  const [password, setPassword] = useState<Integrations['password']>(null);
  const [url, setUrl] = useState<Integrations['url']>(null);
  const [logo, setLogo] = useState<Integrations['logo']>(null);
  const [type, setType] = useState<Integrations['type']>(null);
  const [xmlFull, setXmlFull] = useState<Integrations['xml_full']>(null);
  const [xmlBase, setXmlBase] = useState<Integrations['xml_base']>(null);

  const { mutate: addIntegrationMutation, isLoading } = useMutation(
    async (payload: {
      name: Integrations['name'];
      login: Integrations['login'];
      password: Integrations['password'];
      url: Integrations['url'];
      type: Integrations['type'];
      logo: Integrations['logo'];
      xmlFull: Integrations['xml_full'];
      xmlBase: Integrations['xml_base'];
      user: User;
    }) => {
      const { data, error } = await supabase.from('integrations').insert([
        {
          name: payload.name,
          login: payload.login,
          password: payload.password,
          url: payload.url,
          type: payload.type,
          logo: payload.logo,
          user_id: payload.user.id,
          xml_full: payload.xmlFull,
          xml_base: payload.xmlBase,
        },
      ]);
      if (error) {
        console.log('Error', error);
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Integration added successfully');
        setName('');
        setLogin('');
        setPassword('');
        setUrl('');
        setLogo('');
        setType(null);
        setXmlFull('');
        setXmlBase('');

        return queryClient.invalidateQueries('integrations');
      },
    },
  );

  const hanleSubmitIntegration = async (): Promise<void> => {
    addIntegrationMutation({
      name,
      login,
      password,
      url,
      type,
      logo,
      xmlBase,
      xmlFull,
      user: user!,
    });
    setShowCustomModal(false);
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Button
        color="dark"
        className="bg-primary-700 m-6 flex w-40 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        onClick={() => setShowCustomModal(true)}
      >
        <p className="text-gray-300">+ Integracja</p>
      </Button>
      <CustomModal>
        <h3 className="font-display text-2xl font-bold">Dodaj integracje</h3>
        <div className="flex flex-col gap-4 px-4 py-6">
          <div className="grid grid-cols-2 items-end gap-6 sm:grid-cols-2">
            <div>
              <CustomLogo
                url={logo}
                size={160}
                onUpload={(url) => {
                  setLogo(url);
                }}
              />
            </div>
            <div>
              <Label htmlFor="name">Nazwa</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  key="name"
                  required={true}
                  shadow={true}
                  value={name || ''}
                  type="text"
                  placeholder="App name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Rodzaj</Label>
              <div className="mt-1">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setType(e.target.value as Integrations['type'])
                  }
                  id="type"
                  name="type"
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                >
                  <option selected>Wybierz rodzaj</option>
                  <option value="wholesaler">Hurtownia</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="delivery">Dostawa</option>
                  <option value="finance">Finansowe</option>
                  <option value="shop">Sklep</option>
                  <option value="erp">System ERP</option>
                  <option value="print">Dostawca</option>
                  <option value="other">Inne</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="url">Url</Label>
              <div className="mt-1">
                <TextInput
                  id="url"
                  name="url"
                  key="url"
                  placeholder="https://domain.com"
                  type="url"
                  value={url || ''}
                  onChange={(e) => setUrl(e.target.value)}
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
                  type="text"
                  placeholder="Login"
                  value={login || ''}
                  onChange={(e) => setLogin(e.target.value)}
                  autoComplete="off"
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
                  type="password"
                  placeholder="Hasło"
                  value={password || ''}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            {type === 'wholesaler' && (
              <>
                <div>
                  <Label htmlFor="xmlFull">XML Full</Label>
                  <div className="mt-1">
                    <TextInput
                      id="xmlFull"
                      name="xmlFull"
                      key="xmlFull"
                      type="text"
                      placeholder="XML full url"
                      value={xmlFull || ''}
                      onChange={(e) => setXmlFull(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="xmlBase">XML Base</Label>
                  <div className="mt-1">
                    <TextInput
                      id="xmlBase"
                      name="xmlBase"
                      key="xmlBase"
                      type="text"
                      placeholder="XML base url"
                      value={xmlBase || ''}
                      onChange={(e) => setXmlBase(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
            <div>
              <Button
                onClick={hanleSubmitIntegration}
                disabled={isLoading}
                color="dark"
                className="w-40 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
              >
                {isLoading ? 'Loading ...' : 'Update'}
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
