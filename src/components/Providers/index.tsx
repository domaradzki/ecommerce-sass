'use client';

import { type ReactNode } from 'react';
import { Flowbite } from 'flowbite-react';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RWBProvider>
        <Flowbite theme={{ theme }}>
          <div>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </Flowbite>
      </RWBProvider>
    </QueryClientProvider>
  );
}
