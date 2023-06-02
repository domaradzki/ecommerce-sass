'use client';

import { useAuth } from '@/components/AuthProvider';

export default function SignOut() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error('ERROR signing out:', error);
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
