import { useState } from 'react';
import { Flowbite } from 'flowbite-react';
import { AppProps } from 'next/app';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MyUserContextProvider } from '@/utils/hooks/useUser';
import theme from '@/styles/flowbite-theme';

import 'styles/main.css';
import 'styles/chrome-bug.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
      <MyUserContextProvider>
        <RWBProvider>
          <Flowbite theme={{ theme }}>
            <div>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </div>
          </Flowbite>
        </RWBProvider>
      </MyUserContextProvider>
    </SessionContextProvider>
  );
}
