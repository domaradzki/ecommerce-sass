import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import LoadingDots from 'src/app/components/ui/LoadingDots';
import Logo from 'src/app/components/icons/Logo';
import { getURL } from '@/utils/helpers';
import Layout from 'src/app/components/Layout';
import { useUser } from '@/utils/hooks/useUser';
import { useEffect } from 'react';

const SignIn = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!isLoading && !!user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (!user)
    return (
      <Layout>
        <div className="height-screen-helper flex justify-center">
          <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
            <div className="flex justify-center pb-12 ">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
              <Auth
                supabaseClient={supabaseClient}
                providers={['github']}
                redirectTo={getURL()}
                magicLink={true}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#404040',
                        brandAccent: '#52525b',
                      },
                    },
                  },
                }}
                theme="dark"
              />
            </div>
          </div>
        </div>
      </Layout>
    );

  if (!isLoading && !!user) {
    return (
      <Layout>
        <div className="m-6">
          <LoadingDots />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="m-6">
        <LoadingDots />
      </div>
    </Layout>
  );
};

export default SignIn;
