import { useState } from 'react';
import { Flowbite } from 'flowbite-react';
import { AppProps } from 'next/app';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import theme from '@/styles/flowbite-theme';

import 'styles/main.css';
import 'styles/chrome-bug.css';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <RWBProvider>
        <Flowbite theme={{ theme }}>
          <div>
            <Component {...pageProps} />
          </div>
        </Flowbite>
      </RWBProvider>
    </SessionContextProvider>
  );
}
