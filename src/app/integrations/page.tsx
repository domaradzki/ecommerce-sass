'use client';

import { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import AddIntegrationModal from '@/components/Integrations/AddIntegrationModal';
import CardIntegration from '@/components/Integrations/CardIntegration';
import supabase from '@/utils/supabase-browser';
import { useAuth } from '@/components/AuthProvider';

export default function IntegrationsPage() {
  const { user } = useAuth();

  const { data, isLoading, isSuccess } = useQuery(
    'integrations',
    async () => {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!user, // Only run the query if user is defined
    },
  );
  console.log(data);
  return (
    <>
      <div className="px-4 pt-6">
        <div className="w-full rounded-lg p-6 shadow">
          <div className="mb-4 flex flex-col justify-start">
            <div className="divide-y">
              <h1 className="mb-5 text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                Integrations
              </h1>
            </div>
            <div className="my-2 w-full shrink-0 divide-y">
              <div className="my-2 grid grid-cols-3 justify-items-center gap-4 text-center">
                {isSuccess &&
                  data?.map((item) => (
                    <div
                      key={item['id']}
                      className="rounde-xl flex w-full justify-center"
                    >
                      <CardIntegration item={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddIntegrationModal />
      <Toaster />
    </>
  );
}
