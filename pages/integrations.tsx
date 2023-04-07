import Layout from '@/components/Layout';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from '@/components/ProtectedWrapper';
import AddIntegrationModal from '@/components/Integrations/AddIntegrationModal';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from '@/components/TopBar/Avatar';

type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function IntegrationsPage() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Integrations['name']>(null);
  const [full_name, setFullName] = useState<Integrations['name']>(null);
  const [website, setWebsite] = useState<Integrations['login']>(null);
  const [avatar_url, setAvatarUrl] = useState<Integrations['password']>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!user) throw new Error('No user');

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, full_name, website, avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setFullName(data.full_name);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        alert('Error loading user data!');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session, user, supabase]);

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: Integrations['name'];
    full_name: Integrations['name'];
    website: Integrations['login'];
    avatar_url: Integrations['password'];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  if (!session) return null;

  return (
    <Layout>
      <ProtectedWrapper>
        <div className="px-4 pt-6">
          <div className="w-full rounded-lg p-6 shadow">
            <div className="mb-4 flex flex-col justify-start">
              <div className="divide-y">
                <h1 className="mb-5 text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                  Integrations
                </h1>
              </div>
              <div className="my-2 w-full shrink-0 divide-y">
                <div className="flex w-full justify-end">
                  {/* <Button
                    color="dark"
                    onClick={() => setOpen(true)}
                    className="bg-primary-700"
                  >
                    <div className="flex items-center gap-x-3">
                      <HiPlus className="text-xl" />
                      Dodaj integracje
                    </div>
                  </Button>
                  <AddIntegrationModal isOpen={isOpen} setOpen={setOpen} /> */}
                </div>
                <div className="my-2 grid grid-cols-3 justify-items-center gap-4 text-center">
                  <div className="rounde-xl flex w-full justify-center border-zinc-600 p-8 shadow-lg">
                    01
                  </div>
                  <div className="rounde-xl flex w-full justify-center border-zinc-600 p-8 shadow-lg">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="rounde-xl flex  w-full justify-center border-zinc-600 p-8 shadow-lg">
                    03
                  </div>
                  <div className="rounde-xl flex w-full justify-center border-zinc-600 p-8 shadow-lg ">
                    04
                  </div>
                  <div className="rounde-xl flex w-full justify-center border-zinc-600 p-8 shadow-lg">
                    05
                  </div>
                  <div className="rounde-xl flex w-full justify-center border-zinc-600 p-8 shadow-lg">
                    06
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-233px)] flex-col gap-4 px-4 pt-6">
          {/* <Avatar
            uid={user!.id}
            url={avatar_url}
            size={160}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ username, full_name, website, avatar_url: url });
            }}
          /> */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@domain.com"
              required={true}
              shadow={true}
              value={session.user.email}
              disabled
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" />
            </div>
            <TextInput
              id="username"
              type="text"
              required={true}
              shadow={true}
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="użytkownik"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="full_name" />
            </div>
            <TextInput
              id="full_name"
              type="text"
              required={true}
              shadow={true}
              value={full_name || ''}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="imię i nazwisko"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="website" />
            </div>
            <TextInput
              id="website"
              type="website"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="strona internetowa"
            />
          </div>

          <div>
            <Button
              className="w-40"
              onClick={() =>
                updateProfile({ username, full_name, website, avatar_url })
              }
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </Button>
          </div>
          <div>
            <Button className="w-40" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </ProtectedWrapper>
    </Layout>
  );
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const supabase = createServerSupabaseClient(ctx);
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session)
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//     },
//   };
// };
