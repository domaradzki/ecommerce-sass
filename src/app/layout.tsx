import { type ReactNode } from 'react';
import Providers from '@/components/Providers';
import { AuthProvider } from '@/components/AuthProvider';
import createClient from '@/utils/supabase-server';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export const revalidate = 0;

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="pl">
      <body suppressHydrationWarning={true}>
        <AuthProvider accessToken={accessToken}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
