'use client';
import { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import Account from '@/components/Account';
import { useAuth } from '@/components/AuthProvider';

export default function AccountPage() {
  const { session } = useAuth();
  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/');
  }
  return (
    <>
      <Account session={session} />
      <Toaster />
    </>
  );
}
