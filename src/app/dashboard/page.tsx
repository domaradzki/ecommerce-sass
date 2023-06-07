import SalesThisWeek from '@/components/Flowbite/SalesThisWeek';
import LatestCustomers from '@/components/Flowbite/LatestCustomers';
import AcquisitionOverview from '@/components/Flowbite/AcquistionOverview';
import LatestTransactions from '@/components/Flowbite/LatestTransactions';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound, redirect } from 'next/navigation';
import type { Database } from '@/types/database.types';

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/');
  }

  return (
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
  );
}
