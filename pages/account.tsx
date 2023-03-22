import { useSession } from '@supabase/auth-helpers-react';
import Layout from '@/components/Layout';
import LoadingDots from '@/components/ui/LoadingDots';
import Account from '@/components/Account';

export default function AccountPage() {
  const session = useSession();

  return (
    <Layout>
      {session ? (
        <Account session={session} />
      ) : (
        <div className="m-6">
          <LoadingDots />
        </div>
      )}
    </Layout>
  );
}
