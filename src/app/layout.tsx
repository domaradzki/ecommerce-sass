import { type ReactNode } from 'react';
import Provider from '@/components/Provider';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider>
      <html lang="pl">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
