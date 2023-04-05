import { useSession } from '@supabase/auth-helpers-react';
import Layout from '@/components/Layout';
import LoadingDots from '@/components/ui/LoadingDots';
import Account from '@/components/Account';
import ProtectedWrapper from '@/components/ProtectedWrapper';

export default function AccountPage() {
  const session = useSession();

  return (
    <Layout>
      <ProtectedWrapper>
        {session ? (
          <Account session={session} />
        ) : (
          <div className="m-6">
            <LoadingDots />
          </div>
        )}
      </ProtectedWrapper>
    </Layout>
  );
}
