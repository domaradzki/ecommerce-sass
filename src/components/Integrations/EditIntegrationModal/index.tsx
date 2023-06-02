'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, ChangeEvent, useEffect, FC } from 'react';
import { Database } from '@/types/database.types';
import { useCustomModal } from '@/components/CustomModal';
import CustomLogo from '@/components/CustomLogo';
type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function EditIntegrationModal({
  item,
  setNewLogo,
}: {
  item: Integrations;
  setNewLogo: (logo: string) => void;
}) {
  const { CustomModal, setShowCustomModal } = useCustomModal();
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const [selectedItem, setSelectedItem] = useState<Integrations>(item);

  const handleUpdate = () => {
    updateMutation(selectedItem);
    setShowCustomModal(false);
  };

  useEffect(() => {
    setSelectedItem(item);
  }, [item]);

  const { mutate: updateMutation } = useMutation(
    async (item: any) => {
      const { data, error } = await supabase
        .from('integrations')
        .update({
          name: item.name,
          login: item.login,
          password: item.password,
          url: item.url,
          type: item.type,
          logo: item.logo,
          xmlFull: item.xmlFull,
          xmlBase: item.xmlBase,
        })
        .match({ id: item.id });
      if (error) {
        toast.error('Something went wrong in integration update');
        return error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Integration Updated successfully');
        return queryClient.refetchQueries('integrations');
      },
    },
  );
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Button
        color="dark"
        className="block py-1 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={() => setShowCustomModal(true)}
      >
        <p className="text-gray-300">Edit</p>
      </Button>
      <CustomModal>
        <h3 className="font-display text-2xl font-bold">Edytuj integracje</h3>
        <div className="flex flex-col gap-4 px-4 py-6">
          <div className="grid grid-cols-2 items-end gap-6 sm:grid-cols-2">
            <div>
              <CustomLogo
                url={selectedItem?.logo}
                size={160}
                onUpload={(url) => {
                  setSelectedItem({ ...selectedItem!, logo: url });
                  setNewLogo(url);
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
                  value={selectedItem?.name}
                  type="text"
                  placeholder="App name"
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem!,
                      name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Rodzaj</Label>
              <div className="mt-1">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSelectedItem({
                      ...selectedItem!,
                      type: e.target.value as Integrations['type'],
                    })
                  }
                  id="type"
                  name="type"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
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
                  value={selectedItem?.url || ''}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem!,
                      url: e.target.value,
                    })
                  }
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
                  type="text"
                  value={selectedItem?.login || ''}
                  autoComplete="off"
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem!,
                      login: e.target.value,
                    })
                  }
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
                  type="password"
                  value={selectedItem?.password || ''}
                  autoComplete="off"
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem!,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {selectedItem.type === 'wholesaler' && (
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
                      value={selectedItem?.xml_full || ''}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem!,
                          xml_full: e.target.value,
                        })
                      }
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
                      value={selectedItem?.xml_base || ''}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem!,
                          xml_base: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}
            <div>
              <Button
                onClick={handleUpdate}
                // disabled={loading}
                color="dark"
                className="w-40 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
              >
                Update!!
                {/* {loading ? 'Loading ...' : 'Update'} */}
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
