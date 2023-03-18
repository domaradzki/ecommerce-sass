import { useEffect, useState } from 'react';
import { Flowbite } from 'flowbite-react';
import { AppProps } from 'next/app';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import theme from '@/styles/flowbite-theme';
import { MyUserContextProvider } from '@/utils/useUser';
import type { Database } from 'types_db';

import 'styles/main.css';
import 'styles/chrome-bug.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <div className="bg-black">
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <RWBProvider>
            <Flowbite theme={{ theme }}>
              <div>
                <Component {...pageProps} />
              </div>
            </Flowbite>
          </RWBProvider>
        </MyUserContextProvider>
      </SessionContextProvider>
    </div>
  );
}
