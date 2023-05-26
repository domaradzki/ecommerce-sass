import Layout from '@/components/Layout';
import SalesThisWeek from '@/components/Flowbite/SalesThisWeek';
import LatestCustomers from '@/components/Flowbite/LatestCustomers';
import AcquisitionOverview from '@/components/Flowbite/AcquistionOverview';
import LatestTransactions from '@/components/Flowbite/LatestTransactions';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from '@/components/ProtectedWrapper';

export default function DashboardPage() {
  return (
    <Layout>
      <ProtectedWrapper>
        <div className="px-4 pt-6">
          <SalesThisWeek />
          <div className="my-6">
            <LatestTransactions />
          </div>
          <LatestCustomers />
          <div className="my-6">
            <AcquisitionOverview />
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
