'use client';

import LoadingDots from '@/components/ui/LoadingDots';

import { redirect } from 'next/navigation';
import Auth from '@/components/Auth';
import { useAuth, VIEWS } from '@/components/AuthProvider';

export default function Home() {
  const { initial, user, view } = useAuth();

  if (initial) {
    return (
      <div className="card h-72">
        <LoadingDots />
      </div>
    );
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    redirect('/dashboard');
  }

  return <Auth view={view} />;
}
