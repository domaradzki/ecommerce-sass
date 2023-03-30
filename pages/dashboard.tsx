import Layout from '@/components/Layout';
import SalesThisWeek from '@/components/SalesThisWeek';
import LatestCustomers from '@/components/LatestCustomers';
import AcquisitionOverview from '@/components/AcquistionOverview';
import LatestTransactions from '@/components/LatestTransactions';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@/utils/hooks/useUser';

export default function DashboardPage() {
  const user = useUser();
  console.log('dash', user);

  // console.log('dash', typeof user);
  // useEffect(() => {
  //   if (user) {
  //     router.replace('/dashboard');
  //   }
  //   if (!user) {
  //     router.replace('/signin');
  //   }
  // }, [user]);

  return (
    <Layout>
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
