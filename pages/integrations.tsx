import Layout from '@/components/Layout';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from '@/components/ProtectedWrapper';
import AddIntegrationModal from '@/components/Integrations/AddIntegrationModal';

export default function IntegrationsPage() {
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
                  <AddIntegrationModal />
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
      </ProtectedWrapper>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
