import { useSession } from '@supabase/auth-helpers-react';
import Layout from 'src/app/components/Layout';
import LoadingDots from 'src/app/components/ui/LoadingDots';
import Account from 'src/app/components/Account';
import ProtectedWrapper from 'src/app/components/ProtectedWrapper';

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
