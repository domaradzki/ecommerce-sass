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
      // staleTime: Infinity,
      // structuralSharing: false,
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
      <QueryClientProvider client={queryClient}>
        <MyUserContextProvider>
          <RWBProvider>
            <Flowbite theme={{ theme }}>
              <div>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </div>
            </Flowbite>
          </RWBProvider>
        </MyUserContextProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}