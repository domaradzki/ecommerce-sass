import Layout from 'src/app/components/Layout';
import SalesThisWeek from 'src/app/components/Flowbite/SalesThisWeek';
import LatestCustomers from 'src/app/components/Flowbite/LatestCustomers';
import AcquisitionOverview from 'src/app/components/Flowbite/AcquistionOverview';
import LatestTransactions from 'src/app/components/Flowbite/LatestTransactions';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from 'src/app/components/ProtectedWrapper';

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
