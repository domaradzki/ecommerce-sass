'use client'
import { Toaster } from 'react-hot-toast';
import LoadingDots from '@/components/ui/LoadingDots';
import Account from '@/components/Account';
import {useAuth} from '@/components/AuthProvider'

export default function AccountPage() {

const {session} = useAuth()
  return (
    <>
      {session ? (
        <Account session={session} />
      ) : (
        <div className="m-6">
          <LoadingDots />
        </div>
      )}
       <Toaster />
    </>
  );
}
