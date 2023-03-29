import Layout from '@/components/Layout';
import SalesThisWeek from '@/components/SalesThisWeek';
import LatestCustomers from '@/components/LatestCustomers';
import AcquisitionOverview from '@/components/AcquistionOverview';
import LatestTransactions from '@/components/LatestTransactions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { useUser } from '@supabase/auth-helpers-react';
import useAuthUser from 'hooks/useAuthUser';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthUser();

  console.log('dash', user);
  console.log('dash', typeof user);
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
