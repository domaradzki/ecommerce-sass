import Layout from '@/components/Layout';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from '@/components/ProtectedWrapper';

export default function IntegrationsPage() {
  return (
    <Layout>
      <ProtectedWrapper>
        <div className="px-4 pt-6">
          <div className="w-full rounded-lg p-6 shadow">INTEGRATIONS</div>
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
